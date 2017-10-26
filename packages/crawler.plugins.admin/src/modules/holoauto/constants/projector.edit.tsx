import { IModelProxyState } from "../../../common/reducers/modelproxy";
import { ICrudFormState } from "../../../common/reducers/form";


import { globalOptions, ajv, schemaFormOptions } from "../../../common/schema.form";

export interface ProjectorEditComponentProps {
    submit: IModelProxyState<any>;
    execute?: () => {};
    executeAction?: (schemaFormData: any, extraData: any, func: Function) => {};
    schemaForm: any;
    schemaFormData: any;

    building?: any;
    room?: any;
    projector?: any;

    wallId: number;

    close?: () => {};
    resetMeta?: (schemaFormData: any) => {};
}

export const schemaKey = "projectorCreate";
export const schema = ajv.getSchema("projector").schema;
export const uiSchema = ["*"];

export {
    globalOptions,
    ajv,
    schemaFormOptions
};
