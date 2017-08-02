"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var crawler_plugins_common_1 = require("crawler.plugins.common");
var queue_1 = require("./plugins/queue");
exports.container = new inversify_1.Container();
exports.container.bind(crawler_plugins_common_1.Types._plugin).to(queue_1.QueuePlugin).inSingletonScope().whenNoAncestorNamed("QueuePlugin");
//# sourceMappingURL=container.js.map