import * as joi from "joi";
export interface HtmlModel {
    charset?: string;
    header?: any;
    queueItem: any;
    proxyInfo?: any;
    engine?: string;
}
export declare const htmlJoi: joi.ObjectSchema;
