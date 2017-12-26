"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var crawler_plugins_common_1 = require("crawler.plugins.common");
var kue_1 = require("./plugins/kue");
var kue_2 = require("./libs/kue");
exports.container = new inversify_1.Container();
exports.container.bind(crawler_plugins_common_1.Types._plugin).to(kue_1.KuePlugin).inSingletonScope().whenAnyAncestorNamed("KuePlugin");
exports.container.bind(kue_2.KueService).toSelf();
//# sourceMappingURL=container.js.map