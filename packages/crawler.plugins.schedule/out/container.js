"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var crawler_plugins_common_1 = require("crawler.plugins.common");
var mq_1 = require("./plugins/mq");
var task_1 = require("./plugins/task");
var mq_2 = require("./libs/mq");
exports.container = new inversify_1.Container();
exports.container.bind(crawler_plugins_common_1.Types._plugin).to(mq_1.MQueuePlugin).inSingletonScope().whenAnyAncestorNamed("MQueuePlugin");
exports.container.bind(crawler_plugins_common_1.Types._plugin).to(task_1.TaskPlugin).inSingletonScope().whenAnyAncestorNamed("TaskPlugin");
exports.container.bind(mq_2.MQueueService).toSelf();
//# sourceMappingURL=container.js.map