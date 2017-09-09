
import { combineReducers } from "redux-immutable";

import { LayoutReducer } from "./layout";
import { initialState } from "../constants/layout";

export const layout = new LayoutReducer(initialState.layout);

export default combineReducers({ layout: layout.reducer });
