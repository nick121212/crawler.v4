import { FormReducer, createForms } from "fx-schema-form-react";
import Immutable from "immutable";
import { combineReducers } from "redux-immutable";

import { schema, initialState, schemaKey, editReducer } from "./constant";
import { ajv } from "../../../common/schema.form";

export let schemaFromReducer: FormReducer<any> = createForms.createOne(schemaKey,
    Immutable.fromJS(initialState), ajv, schema, (state: any) => {
        let origin = state.toJS();

        return {
            originMeta: origin.meta,
            originData: origin.data
        };
    }, (state: any, data: any) => {
        if (Immutable.Map.isMap(state)) {
            return state.merge(data);
        }

        return Immutable.fromJS(data);
    });

export const actions = [
    editReducer.actions.setCurrentEditForm
];

const reducer = combineReducers({
    schemaForm: schemaFromReducer.reducer,
    edit: editReducer.reducer
});


export default reducer;
