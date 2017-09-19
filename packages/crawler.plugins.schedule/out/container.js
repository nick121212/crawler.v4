"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var crawler_plugins_common_1 = require("crawler.plugins.common");
var mq_1 = require("./plugins/mq");
var task_1 = require("./plugins/task");
var plugin_1 = require("./plugins/plugin");
var mq_2 = require("./libs/mq");
var plugin_2 = require("./libs/plugin");
exports.container = new inversify_1.Container();
exports.container.bind(crawler_plugins_common_1.Types._plugin).to(task_1.TaskPlugin).inSingletonScope().whenAnyAncestorNamed("TaskPlugin");
exports.container.bind(crawler_plugins_common_1.Types._plugin).to(mq_1.MQueuePlugin).inSingletonScope().whenAnyAncestorNamed("MQueuePlugin");
exports.container.bind(crawler_plugins_common_1.Types._plugin).to(plugin_1.PluginPlugin).inSingletonScope().whenAnyAncestorNamed("PluginPlugin");
exports.container.bind(mq_2.MQueueService).toSelf();
exports.container.bind(plugin_2.ExecutePluginService).toSelf();
//# sourceMappingURL=container.js.map