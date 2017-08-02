"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var crawler_plugins_common_1 = require("crawler.plugins.common");
var html_1 = require("./plugins/html");
exports.container = new inversify_1.Container();
exports.container.bind(crawler_plugins_common_1.Types._plugin).to(html_1.HtmlPlugin).inSingletonScope().whenNoAncestorNamed("HtmlPlugin");
//# sourceMappingURL=container.js.map