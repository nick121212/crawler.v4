"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var crawler_plugins_common_1 = require("crawler.plugins.common");
var wp_1 = require("./plugins/wp");
exports.container = new inversify_1.Container();
exports.container.bind(crawler_plugins_common_1.Types._plugin).to(wp_1.WpPlugin).inSingletonScope().whenNoAncestorNamed("WpPlugin");
//# sourceMappingURL=container.js.map