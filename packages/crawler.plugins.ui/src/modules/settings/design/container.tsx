import React from "react";
import { connect } from "react-redux";
import { compose, defaultProps } from "recompose";
import Immutable from "immutable";
import { DropTarget } from "react-dnd";

import { DesignProps } from "./constant";

export const hoc = compose<DesignProps, any>(
    connect((state: Immutable.Map<string, any>, ownProps: any) => {
        return {
            // routing: state.get("routing"),
            // settings: state.getIn(["modules", "settings", "design"]),
            $edit: state.getIn(["modules", "settings", "design", "edit"]),
        };
    })
);
