import React from "react";
import { Dispatch } from "redux";

import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";

import { LayoutComponentProps } from "../constants/layout";
import { WallsComponentProps } from "../constants/walls";
// import { fetchModel, } from "../reducers/walls";
import { layoutModel } from "../reducers";
import { ProjectorEditComponentWithHoc } from "../components/projector.edit";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        room: state.getIn(["app", "holoauto", "layout", "curRoom"]),
        layout: state.getIn(["app", "holoauto", "layout"])
    };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any) => {
    // if (!fetchModel.actions.execute.assigned()) {
    //     fetchModel.actions.execute.assignTo(dispatch);
    // }
    return {
        setBuildingEditChain: (chain: any[]) => {
            // layoutModel.actions.setChain(chain);
        }
    };
};

export const hoc = compose<WallsComponentProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({
        execute: (props: WallsComponentProps) => {
            return () => {
                // fetchModel.actions.execute({

                // }, { ns: "holoauto", key: "build-list" });
            };
        }
    })
);
