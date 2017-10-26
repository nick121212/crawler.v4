import React from "react";
import { Dispatch } from "redux";

import { connect } from "react-redux";
import { batch } from "redux-act";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";

import { BuildingEditComponentProps, schemaFormOptions } from "../constants/building.edit";
import { submitModel, schemaForm } from "../reducers/building.edit";
import { layoutModel } from "../reducers/layout";
import { BuildingRoomsComponentWithHoc } from "../components/rooms";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    let schemaFormData = state.getIn(["app", "holoauto", "buildingEdit", "schemaForm"]);

    return {
        submit: state.getIn(["app", "holoauto", "buildingEdit", "submit"]),
        schemaFormData: schemaFormData,
        building: state.getIn(["app", "holoauto", "layout", "curBuild"]),
        // meta: schemaFormData.meta,
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
        executeAction: async (schemaFormData: any, resetMeta) => {
            let meta = await schemaFormData.meta.validateAll(schemaFormData.data);

            dispatch(schemaForm.actions.updateMetaState({ isLoading: true, isValid: false }));
            dispatch(schemaForm.actions.updateMetaState({
                isLoading: false,
                meta: meta
            }));
            if (schemaFormData.meta.data.isValid) {
                let data: any = await dispatch(submitModel.actions.execute({
                    data: schemaFormData.data
                }, { ns: "holoauto", key: "build-add" }));

                if (!data.error) {
                    resetMeta();
                    // layoutModel.actions.popChain(0);
                }
            }
        }
    };
};

export const hoc = compose<BuildingEditComponentProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({
        execute: (props: BuildingEditComponentProps) => {
            const { schemaFormData } = props;

            return async () => {
                await props.executeAction(schemaFormData, () => {
                    // props.resetMeta(schemaFormData);
                    layoutModel.actions.popChain(0);
                });
            };
        },
        close: (props: BuildingEditComponentProps) => {
            const { schemaFormData, building } = props;

            return () => {
                if (building) {
                    return layoutModel.actions.setCurBuilding({ build: building, component: <BuildingRoomsComponentWithHoc key="BuildingRoomsComponentWithHoc" /> });

                }
                layoutModel.actions.popChain(0);
            };
        }
    }),
    lifecycle<BuildingEditComponentProps, any>({
        componentWillUnmount: function () {
            this.props.resetMeta(this.props.schemaFormData);
        }
    })
);
