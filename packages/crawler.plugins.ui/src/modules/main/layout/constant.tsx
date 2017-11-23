import React from "react";
import Immutable from "immutable";

export interface LayoutProps {
    themeSettings?: Immutable.Map<string, any>;
}

export const $InitialState = Immutable.fromJS({});
