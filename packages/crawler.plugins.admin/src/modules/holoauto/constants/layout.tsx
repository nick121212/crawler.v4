// import React from "react";
import * as Immutable from "immutable";

import { IModelProxyState } from "../../../common/reducers/modelproxy";

export interface LayoutComponentProps {
    layout: Immutable.Map<string, any>;
}

export const initialState: any = {
    chain: [],
    curBuild: null,
    curRoom: null,
    curProjector: null
};
