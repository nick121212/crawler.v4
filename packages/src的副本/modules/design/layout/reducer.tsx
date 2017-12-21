import { createForms } from "fx-schema-form-antd";
import { combineReducers } from "redux-immutable";

import { ModelProxyReducer } from "../../../common/reducer/proxy";
import { schemaKey, ajv, schema } from "./constant";

export let submitModel = new ModelProxyReducer();
export const schemaForm = createForms.createOne(schemaKey, {}, ajv, schema);

export default combineReducers({
    result: submitModel.reducer,
    schemaForm: schemaForm.reducer,
});
