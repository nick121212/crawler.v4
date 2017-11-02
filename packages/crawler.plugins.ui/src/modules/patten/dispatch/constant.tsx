import Immutable from "immutable";

import { IModelProxyState } from "../../../common/reducer/proxy";
import { globalOptions, ajv, schemaFormOptions } from "../../../common/schema.form";

export interface ContentProps {
    result?: IModelProxyState<Immutable.Map<string, any>>;
    schemaForm: any;
    execute?: () => void;
}

export const schemaKey = "partten-test";
export const schema = ajv.getSchema("patten-test").schema;
export const uiSchema = ["*"];

export {
    globalOptions,
    ajv,
    schemaFormOptions
};
