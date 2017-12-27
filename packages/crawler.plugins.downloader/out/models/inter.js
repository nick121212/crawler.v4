"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joi = require("joi");
exports.interJoi = joi.object().keys({
    charset: joi.string().label("字符集"),
    proxyInfo: joi.string().label("代理信息"),
    engine: joi.string().label("调用接口的引擎").allow("superagent", "request", "phantom"),
    header: joi.object().label("http头信息"),
    url: joi.string().required().label("请求的地址"),
    path: joi.string().required().label("请求的路径"),
    method: joi.string().required().label("请求的方法")
});
//# sourceMappingURL=inter.js.map