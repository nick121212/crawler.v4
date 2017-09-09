"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var crawler_plugins_common_1 = require("crawler.plugins.common");
var elastic_1 = require("./plugins/elastic");
exports.container = new inversify_1.Container();
exports.container.bind(crawler_plugins_common_1.Types._plugin).to(elastic_1.EsStorePlugin).inSingletonScope().whenAnyAncestorNamed("EsStorePlugin");
//# sourceMappingURL=container.js.map