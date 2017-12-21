"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joi = require("joi");
exports.htmlJoi = joi.object().keys({
    charset: joi.string().label("字符集"),
    proxyInfo: joi.string().label("代理信息"),
    engine: joi.string().label("调用接口的引擎").allow("superagent", "request", "phantom"),
    header: joi.object().label("http头信息"),
    queueItem: joi.object().keys({
        url: joi.string().required()
    }).required()
});
//# sourceMappingURL=html.js.map