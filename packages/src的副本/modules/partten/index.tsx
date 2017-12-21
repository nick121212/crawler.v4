import { combineReducers } from "redux-immutable";

import listReducer, { fetchModel, filterGroup } from "./list/reducer";
import testReducer, { submitModel as dispatchModel } from "./dispatch/reducer";
import layoutReducer, { layoutMainReducer } from "./layout/reducer";

export { ComponentWithHoc } from "./layout/component";

export const reducer = combineReducers({
    content: listReducer,
    test: testReducer,
    layout: layoutReducer
});

export const sagas = [fetchModel.saga.bind(fetchModel), dispatchModel.saga.bind(dispatchModel)];
export const actions = [
    fetchModel.actions.execute,
    dispatchModel.actions.execute,
    layoutMainReducer.actions.setOperations,
    filterGroup.actions.setGroup
];
