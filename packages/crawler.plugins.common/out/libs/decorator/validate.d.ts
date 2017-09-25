import * as joi from "joi";
export interface IValidate {
    joi?: joi.AnySchema;
    options?: any;
    target: any;
    key: string;
    index: number;
}
export declare const Validate: <T>(joi?: joi.AnySchema | undefined, options?: any) => (target: any, key: string, index: number) => any;
