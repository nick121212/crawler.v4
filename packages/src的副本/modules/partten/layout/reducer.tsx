import { combineReducers } from "redux-immutable";

import { ModelProxyReducer } from "../../../common/reducer/proxy";
import { initialState } from "./constant";
import { LayoutMainReducer } from "./main.reducer";

export let layoutMainReducer = new LayoutMainReducer(initialState);

export default combineReducers({
    main: layoutMainReducer.reducer
});
