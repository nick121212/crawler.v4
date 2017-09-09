
import { combineReducers } from "redux-immutable";

import listReducer, { listData } from "./list";
import createReducer, { formData } from "./create";

export default combineReducers(Object.assign({}, listReducer, createReducer));

export const sagas = [listData.saga.bind(listData, formData)];
