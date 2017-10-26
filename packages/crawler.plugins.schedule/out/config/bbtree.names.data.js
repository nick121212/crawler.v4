"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * msgFlow顺序
 *  1. 从queue里面获取人名数组
 *  2. 循环存入wp
 */
exports.default = {
    "key": "bbtree.names.data",
    "title": "qa的配置",
    "purge": true,
    "delay": 5000,
    "prefech": 1,
    "startPartten": "role:crawler.plugin.plugin,cmd:startNormalFlow",
    "initFlow": [],
    "msgFlow": [{
            "partten": "role:crawler.plugin.wp,cmd:user",
            "title": "调用保存user的wp插件",
            "force": true,
            "jsonata": ["$"],
            "data": {}
        }]
};
//# sourceMappingURL=bbtree.names.data.js.map