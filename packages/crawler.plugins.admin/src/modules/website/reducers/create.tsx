import { combineReducers } from "redux-immutable";

import { CrudFormReducer, ICrudFormState } from "../../../common/reducers/form";
import { ModelProxyReducer, IModelProxyState } from "../../../common/reducers/modelproxy";
import { initialState } from "../constants/create";

export const form = new CrudFormReducer(initialState.form);
export const formData = new ModelProxyReducer(initialState.formData);

export default {
    create: combineReducers({
        form: form.reducer,
        formData: formData.reducer
    })
};
