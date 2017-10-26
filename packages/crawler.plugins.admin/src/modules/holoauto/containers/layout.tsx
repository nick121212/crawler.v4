import React from "react";
import { bindActionCreators, Dispatch } from "redux";

import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";

import { LayoutComponentProps } from "../constants/layout";
import { layoutModel } from "../reducers/layout";

import { BuildingComponentWithHoc } from "../components/buildings";


export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        layout: state.getIn(["app", "holoauto", "layout"]),
        routing: state.get("routing")
    };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any) => {
    layoutModel.init(dispatch);

    return {

    };
};

export const hoc = compose<LayoutComponentProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle<LayoutComponentProps, any>({
        componentDidMount: function () {
            if (!this.props.layout.get("chain").length) {
                layoutModel.actions.setChain([<BuildingComponentWithHoc key="BuildingComponentWithHoc" />]);
            }
        }
    })
);
