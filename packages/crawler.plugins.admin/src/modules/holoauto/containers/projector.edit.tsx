import React from "react";
import { Dispatch } from "redux";

import { connect } from "react-redux";
import { batch } from "redux-act";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";

import { ProjectorEditComponentProps, schemaFormOptions } from "../constants/projector.edit";
import { submitModel, schemaForm } from "../reducers/projector.edit";
import { layoutModel } from "../reducers/layout";
import { PanelComponentWithHoc } from "../components/panel";
// import { BuildingRoomsComponentWithHoc } from "../components/rooms";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    let schemaFormData = state.getIn(["app", "holoauto", "projectorEdit", "schemaForm"]);

    return {
        submit: state.getIn(["app", "holoauto", "projectorEdit", "submit"]),
        schemaFormData: schemaFormData,
        room: state.getIn(["app", "holoauto", "layout", "curRoom"]),
        building: state.getIn(["app", "holoauto", "layout", "curBuild"]),
        projector: state.getIn(["app", "holoauto", "layout", "curProjector"]),
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
        executeAction: async (schemaFormData: any, extraData: any, resetMeta) => {
            let meta = await schemaFormData.meta.validateAll(schemaFormData.data);

            dispatch(schemaForm.actions.updateMetaState({ isLoading: true, isValid: false }));
            dispatch(schemaForm.actions.updateMetaState({
                isLoading: false,
                meta: meta
            }));
            if (schemaFormData.meta.data.isValid) {
                let data: any = await dispatch(submitModel.actions.execute({
                    data: Object.assign({}, extraData, schemaFormData.data)
                }, { ns: "holoauto", key: "projector-add" }));

                if (!data.error) {
                    resetMeta();
                    // layoutModel.actions.popChain(0);
                }
            }
        }
    };
};

export const hoc = compose<ProjectorEditComponentProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({
        execute: (props: ProjectorEditComponentProps) => {
            const { schemaFormData, room, wallId } = props;

            return async () => {
                await props.executeAction(schemaFormData, {
                    roomId: room.get("roomId"),
                    wallId: wallId
                }, () => {
                    layoutModel.actions.popChain(0);
                });
            };
        },
        close: (props: ProjectorEditComponentProps) => {
            const { schemaFormData, projector } = props;

            return () => {
                if (projector) {
                    return layoutModel.actions.setCurProjector({ projector: projector, component: <PanelComponentWithHoc key="PanelComponentWithHoc" /> });

                }
                layoutModel.actions.popChain(0);
            };
        }
    }),
    lifecycle<ProjectorEditComponentProps, any>({
        componentWillUnmount: function () {
            this.props.resetMeta(this.props.schemaFormData);
        }
    })
);
