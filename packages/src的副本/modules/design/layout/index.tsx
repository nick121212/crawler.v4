import { combineReducers } from "redux-immutable";

import layoutReducer, { schemaForm, submitModel } from "./reducer";

export { ComponentWithHoc } from "./component";

export const reducer = layoutReducer;
export const sagas = [submitModel.saga.bind(submitModel)];
export const actions = [
    submitModel.actions.execute
];
