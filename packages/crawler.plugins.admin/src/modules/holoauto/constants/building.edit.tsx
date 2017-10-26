import { IModelProxyState } from "../../../common/reducers/modelproxy";
import { ICrudFormState } from "../../../common/reducers/form";


import { globalOptions, ajv, schemaFormOptions } from "../../../common/schema.form";

export interface BuildingEditComponentProps {
    submit: IModelProxyState<any>;
    execute?: () => {};
    executeAction?: (schemaFormData: any, func: Function) => {};
    schemaForm: any;
    schemaFormData: any;

    building?: any;
    close?: () => {};
    resetMeta?: (schemaFormData: any) => {};
}

export const schemaKey = "buildingCreate";
export const schema = ajv.getSchema("building").schema;
export const uiSchema = ["*"];

export {
    globalOptions,
    ajv,
    schemaFormOptions
};
