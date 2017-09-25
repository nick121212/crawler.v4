import * as joi from "joi";

export interface HtmlModel {
    charset?: string;
    header?: any;
    queueItem: any;
    proxyInfo?: any;
    engine?: string;
}

export const htmlJoi = joi.object().keys({
    charset: joi.string().label("字符集"),
    proxyInfo: joi.string().label("代理信息"),
    engine: joi.string().label("调用接口的引擎").allow("superagent", "request", "phantom"),
    header: joi.object().label("http头信息"),
    queueItem: joi.object().keys({
        url: joi.string().required()
    }).required()
});
