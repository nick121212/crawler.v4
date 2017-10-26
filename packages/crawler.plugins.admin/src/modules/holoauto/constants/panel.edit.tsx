import { IModelProxyState } from "../../../common/reducers/modelproxy";
import { ICrudFormState } from "../../../common/reducers/form";


import { globalOptions, ajv, schemaFormOptions } from "../../../common/schema.form";

export interface PanelEditComponentProps {
    submit: IModelProxyState<any>;
    execute?: () => {};
    executeAction?: (schemaFormData: any, func: Function) => {};
    schemaForm: any;
    schemaFormData: any;
    close?: () => {};
    resetMeta?: (schemaFormData: any) => {};
    projector?: any;
}

export const schemaKey = "panelCreate";
export const schema = ajv.getSchema("panel").schema;
export const uiSchema = ["*"];

export {
    globalOptions,
    ajv,
    schemaFormOptions
};
