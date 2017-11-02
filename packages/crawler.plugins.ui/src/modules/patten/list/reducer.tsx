import { combineReducers } from "redux-immutable";

import { ModelProxyReducer } from "../../../common/reducer/proxy";
import { initialState } from "./constant";
import { FilterGroupReducer } from "./filter.reducer";

export let fetchModel = new ModelProxyReducer();
export let filterGroup = new FilterGroupReducer(initialState);

const reducer = fetchModel.reducer;

export default combineReducers({
    list: fetchModel.reducer,
    filter: filterGroup.reducer
});
