import { IModelProxyState } from "../../../common/reducers/modelproxy";
import { ICrudFormState } from "../../../common/reducers/form";
import { defaultKeys } from "./index";

import { globalOptions, ajv, schemaFormOptions } from "../../../common/schema.form";

export interface CreateComponentProps {
    submitModel: IModelProxyState<any>;
    schemaForm: any;
    submitForm: (data: any) => void;
}

export const schemaKey = "create";
export const reducerKeys = defaultKeys.concat([schemaKey]);
export const schema = ajv.getSchema("normal").schema;
export const uiSchema = ["*"];

export {
    globalOptions,
    ajv,
    schemaFormOptions
};
