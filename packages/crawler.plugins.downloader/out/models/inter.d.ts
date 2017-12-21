import * as joi from "joi";
export interface InterModel {
    charset: string;
    header: any;
    url: string;
    path: string;
    method?: string;
    params?: any;
    data?: any;
    proxyInfo: any;
    engine?: string;
}
export declare const interJoi: joi.ObjectSchema;
