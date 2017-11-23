import React from "react";
import { connect } from "react-redux";
import { compose, defaultProps } from "recompose";
import Immutable from "immutable";

import { MenuProps } from "./constant";

export const hoc = compose<MenuProps, any>(
    defaultProps({ theme: "dark" }),
    connect((state: Immutable.Map<string, any>, ownProps: any) => {
        return {
            routing: state.get("routing"),
        };
    })
);
