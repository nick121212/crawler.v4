import { combineReducers } from "redux-immutable";

import { CrudListReducer, ICrudListState } from "../../../common/reducers/list";
import { ModelProxyReducer, IModelProxyState } from "../../../common/reducers/modelproxy";
import { initialState } from "../constants/list";

export const list = new CrudListReducer(initialState.list);
export const listData = new ModelProxyReducer(initialState.listData);

export default {
    list: combineReducers({
        list: list.reducer,
        listData: listData.reducer
    })
};
