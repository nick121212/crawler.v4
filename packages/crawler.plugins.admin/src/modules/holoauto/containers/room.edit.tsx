import React from "react";
import { Dispatch } from "redux";

import { connect } from "react-redux";
import { batch } from "redux-act";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";

import { RoomEditComponentProps, schemaFormOptions } from "../constants/room.edit";
import { submitModel, schemaForm } from "../reducers/room.edit";
import { layoutModel } from "../reducers/layout";
import { WallsComponentWithHoc } from "../components/walls";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    let schemaFormData = state.getIn(["app", "holoauto", "roomEdit", "schemaForm"]);

    return {
        submit: state.getIn(["app", "holoauto", "roomEdit", "submit"]),
        schemaFormData: schemaFormData,
        room: state.getIn(["app", "holoauto", "layout", "curRoom"]),
        build: state.getIn(["app", "holoauto", "layout", "curBuild"]),
        isValid: schemaFormData.meta.data.isValid,
    };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any) => {
    return {
        resetMeta: (schemaFormData: any) => {
            schemaFormData.meta.data.map = {};
            schemaFormData.meta.data.meta = {};

            dispatch(schemaForm.actions.updateData({ data: {} }));
            dispatch(schemaForm.actions.updateMetaState({ meta: schemaFormData.meta }));
        },
        executeAction: async (schemaFormData: any, build, resetMeta) => {
            let meta = await schemaFormData.meta.validateAll(schemaFormData.data);

            dispatch(schemaForm.actions.updateMetaState({ isLoading: true, isValid: false }));
            dispatch(schemaForm.actions.updateMetaState({
                isLoading: false,
                meta: meta
            }));
            if (schemaFormData.meta.data.isValid) {
                let data: any = await dispatch(submitModel.actions.execute({
                    data: Object.assign({}, { buildId: build.get("buildId") }, schemaFormData.data)
                }, { ns: "holoauto", key: "room-add" }));

                if (!data.error) {
                    resetMeta();
                }
            }
        }
    };
};

export const hoc = compose<RoomEditComponentProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({
        execute: (props: RoomEditComponentProps) => {
            const { schemaFormData, build } = props;

            return async () => {
                await props.executeAction(schemaFormData, build, () => {
                    layoutModel.actions.popChain(0);
                });
            };
        },
        close: (props: RoomEditComponentProps) => {
            const { schemaFormData, room } = props;

            return () => {
                if (room) {
                    return layoutModel.actions.setCurRoom({ room: room, component: <WallsComponentWithHoc key="WallsComponentWithHoc" /> });
                }
                layoutModel.actions.popChain(0);
            };
        }
    }),
    lifecycle<RoomEditComponentProps, any>({
        componentWillUnmount: function () {
            this.props.resetMeta(this.props.schemaFormData);
        }
    })
);
