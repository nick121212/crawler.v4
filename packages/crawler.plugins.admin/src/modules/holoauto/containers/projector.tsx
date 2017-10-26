import React from "react";
import { Dispatch } from "redux";

import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";

import { LayoutComponentProps } from "../constants/layout";
import { ProjectorComponentProps } from "../constants/projector";
import * as fetchModels from "../reducers/projector";
import { layoutModel } from "../reducers";
import { ProjectorEditComponentWithHoc } from "../components/projector.edit";
import { PanelComponentWithHoc } from "../components/panel";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: ProjectorComponentProps) => {
    let wallId = ownProps.wallId;

    return {
        room: state.getIn(["app", "holoauto", "layout", "curRoom"]),
        fetch: state.getIn(["app", "holoauto", "projector" + wallId]),
        layout: state.getIn(["app", "holoauto", "layout"])
    };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any) => {
    if (!fetchModels["fetchModel" + ownProps.wallId].actions.execute.assigned()) {
        fetchModels["fetchModel" + ownProps.wallId].actions.execute.assignTo(dispatch);
    }
    return {
        setBuildingEditChain: (chain: any[]) => {
            layoutModel.actions.setChain(chain);
        }
    };
};

export const hoc = compose<ProjectorComponentProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({
        execute: (props: ProjectorComponentProps) => {
            return () => {
                fetchModels["fetchModel" + props.wallId].actions.execute({
                    params: {
                        roomId: props.room.get("roomId"),
                        wallId: props.wallId
                    }
                }, { ns: "holoauto", key: "projector-query" });
            };
        },
        setProjectorEditChainHandle: (props: ProjectorComponentProps & LayoutComponentProps) => {
            return (wallId: any) => {
                let curChain = props.layout.get("chain");

                if (!curChain) {
                    console.error("没有chain信息！");
                }
                curChain = curChain.toJSON();
                curChain.length = 3;
                curChain.push(<ProjectorEditComponentWithHoc key="ProjectorEditComponentWithHoc" wallId={wallId} />);

                layoutModel.actions.setChain(curChain);
            };
        },
        changeSelectProjectorHandle: (props: ProjectorComponentProps & LayoutComponentProps) => {
            return (data: any) => {
                layoutModel.actions.setCurProjector({ projector: data, component: <PanelComponentWithHoc key={data.projectorId + "PanelComponentWithHoc"} /> });
            };
        },
    }),
    lifecycle<ProjectorComponentProps, any>({
        componentDidMount: function () {
            // const { loading, loaded } = this.props.fetch;
            // if (loading || loaded) {
            //     return;
            // }
            this.props.execute();
        }
    })
);
