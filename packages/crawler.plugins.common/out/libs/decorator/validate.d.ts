import * as joi from "joi";
export interface IValidate {
    joi?: joi.AnySchema<any>;
    options?: any;
    target: any;
    key: string;
    index: number;
}
export declare const Validate: <T>(joi?: joi.AnySchema<any> | undefined, options?: any) => (target: any, key: string, index: number) => any;
