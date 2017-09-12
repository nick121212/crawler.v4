"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var crawler_plugins_common_1 = require("crawler.plugins.common");
var container_1 = require("./container");
var constants_1 = require("./constants");
var seneca = new crawler_plugins_common_1.Seneca(container_1.container, {
    tag: constants_1.pluginName
});
seneca.seneca
    .ready(function () {
    console.log("crawler.plugins.html ready");
});
//# sourceMappingURL=index.js.map