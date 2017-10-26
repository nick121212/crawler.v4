import React from "react";
import { Dispatch } from "redux";

import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";

import { LayoutComponentProps } from "../constants/layout";
import { BuildingComponentProps } from "../constants/building";
import { fetchModel, deleteModel } from "../reducers/building";
import { layoutModel } from "../reducers";
import { mapStateToProps as layoutMapStateToProps } from "./layout";
import { BuildingEditComponentWithHoc } from "../components/building.edit";
import { BuildingRoomsComponentWithHoc } from "../components/rooms";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        fetch: state.getIn(["app", "holoauto", "building"]),
        building: state.getIn(["app", "holoauto", "layout", "curBuild"]),
        buildDelete: state.getIn(["app", "holoauto", "buildDelete"]),
        layout: state.getIn(["app", "holoauto", "layout"])
    };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any) => {
    if (!fetchModel.actions.execute.assigned()) {
        fetchModel.actions.execute.assignTo(dispatch);
    }
    if (!deleteModel.actions.execute.assigned()) {
        deleteModel.actions.execute.assignTo(dispatch);
    }
    return {
        setBuildingEditChain: (chain: any[]) => {
            layoutModel.actions.setChain(chain);
        }
    };
};

export const hoc = compose<BuildingComponentProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({
        execute: (props: BuildingComponentProps) => {
            return () => {
                fetchModel.actions.execute({

                }, { ns: "holoauto", key: "build-list" });
            };
        },
        remove: (props: BuildingComponentProps) => {
            return async (build: any) => {
                let data: any = await deleteModel.actions.execute({
                    params: {
                        buildId: build.buildId
                    }
                }, { ns: "holoauto", key: "build-remove" });

                if (!data.error) {
                    fetchModel.actions.execute({}, { ns: "holoauto", key: "build-list" });
                }
            };
        },
        setBuildingEditChainHandle: (props: BuildingComponentProps & LayoutComponentProps) => {
            return (chain: any) => {
                let curChain = props.layout.get("chain");

                if (!curChain) {
                    console.error("没有chain信息！");
                }
                curChain = curChain.toJSON();

                curChain.length = 1;
                curChain.push(<BuildingEditComponentWithHoc key="BuildingEditComponentWithHoc" />);

                layoutModel.actions.setChain(curChain);
            };
        },
        changeSelectBuildingHandle: (props: BuildingComponentProps & LayoutComponentProps) => {
            // let { building } = props;

            return (data: any) => {
                layoutModel.actions.setCurBuilding({ build: data, component: <BuildingRoomsComponentWithHoc key={data.buildId + "BuildingRoomsComponentWithHoc"} /> });
            };
        },
    })
);

export const mainHoc = compose<BuildingComponentProps, any>(
    hoc,
    lifecycle<BuildingComponentProps, any>({
        componentDidMount: function () {
            const { loading, loaded } = this.props.fetch;

            if (loading || loaded) {
                return;
            }

            this.props.execute();
        }
    })
);
