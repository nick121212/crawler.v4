import React from "react";
import { Dispatch } from "redux";

import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";

import { LayoutComponentProps } from "../constants/layout";
import { PanelComponentProps } from "../constants/panel";
import { layoutModel } from "../reducers";
import { mapStateToProps as layoutMapStateToProps } from "./layout";
import { PanelComponentWithHoc } from "../components/panel";
import { fetchModel } from "../reducers/panel";
import { PanelEditComponentWithHoc } from "../components/panel.edit";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        fetch: state.getIn(["app", "holoauto", "panel"]),
        projector: state.getIn(["app", "holoauto", "layout", "curProjector"]),
        wall: state.getIn(["app", "holoauto", "layout", "curWall"]),
        room: state.getIn(["app", "holoauto", "layout", "curRoom"]),
        layout: state.getIn(["app", "holoauto", "layout"])
    };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any) => {
    if (!fetchModel.actions.execute.assigned()) {
        fetchModel.actions.execute.assignTo(dispatch);
    }

    return {
        setBuildingEditChain: (chain: any[]) => {
            layoutModel.actions.setChain(chain);
        }
    };
};

export const hoc = compose<PanelComponentProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({
        execute: (props: PanelComponentProps) => {
            return () => {
                fetchModel.actions.execute({
                    params: {
                        projectorId: props.projector.get("projectorId")
                    }
                }, { ns: "holoauto", key: "panel-query" });
            };
        },
        close: (props: PanelComponentProps) => {
            const { projector } = props;

            return () => {
                if (projector) {
                    return layoutModel.actions.setCurProjector({ projector: projector, component: <PanelComponentWithHoc key="PanelComponentWithHoc" /> });

                }
                layoutModel.actions.popChain(0);
            };
        },
        setPanelEditChainHandle: (props: PanelComponentProps & LayoutComponentProps) => {
            return (chain: any) => {
                let curChain = props.layout.get("chain");

                if (!curChain) {
                    console.error("没有chain信息！");
                }
                curChain = curChain.toJSON();

                curChain.length = 4;
                curChain.push(<PanelEditComponentWithHoc />);

                layoutModel.actions.setChain(curChain);
            };
        }
    })
);

export const mainHoc = compose<PanelComponentProps, any>(
    hoc,
    lifecycle<PanelComponentProps, any>({
        componentDidMount: function () {
            // const { loading, loaded } = this.props.fetch;
            // if (loading || loaded) {
            //     return;
            // }
            this.props.execute();
        }
    })
);
