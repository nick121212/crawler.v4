import { combineReducers } from "redux-immutable";
import { createForms } from "fx-schema-form-antd";

import { ModelProxyReducer, ModelProxyActions } from "../../../common/reducers/modelproxy";
import { CrudFormReducer } from "../../../common/reducers/form";

import { schema, uiSchema, globalOptions, schemaKey, ajv } from "../constants/panel.edit";

export const submitModel = new ModelProxyReducer();
export const schemaForm = createForms.createOne(schemaKey, {}, ajv, schema);

export default combineReducers({
    submit: submitModel.reducer,
    schemaForm: schemaForm.reducer,
});
