import React from "react";
import { connect } from "react-redux";
import { compose, defaultProps } from "recompose";
import Immutable from "immutable";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import { LayoutProps } from "./constant";

export const hoc = compose<LayoutProps, any>(
    DragDropContext(HTML5Backend),
    connect((state: Immutable.Map<string, any>, ownProps: any) => {
        return {
            routing: state.get("routing"),
            settings: state.getIn(["modules", "settings", "layout"]),
        };
    })
);
