import React from "react";
import { Dispatch } from "redux";

import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";

import { RoomEditComponentProps, schemaFormOptions } from "../constants/room.edit";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    let schemaFormData = state.getIn(["app", "holoauto", "roomEdit", "schemaForm"]);

    return {
        schemaFormData: schemaFormData
    };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any) => {
    return {};
};

export const hoc = compose<any, any>(
    connect(mapStateToProps, mapDispatchToProps)
);
