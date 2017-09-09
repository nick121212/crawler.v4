"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
// import { MQueuePlugin } from "./plugins/mq";
// import { TaskPlugin } from "./plugins/task";
// import { MQueueService } from "./libs/mq";
exports.container = new inversify_1.Container();
// container.bind<PluginBase>(CommonTypes._plugin).to(MQueuePlugin).inSingletonScope().whenAnyAncestorNamed("MQueuePlugin");
// container.bind<PluginBase>(CommonTypes._plugin).to(TaskPlugin).inSingletonScope().whenAnyAncestorNamed("TaskPlugin");
// container.bind<MQueueService>(MQueueService).toSelf(); 
//# sourceMappingURL=container.js.map