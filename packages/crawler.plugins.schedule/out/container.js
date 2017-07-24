"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var crawler_common_1 = require("crawler.common");
var inversify_binding_decorators_1 = require("inversify-binding-decorators");
var mq_1 = require("./plugins/mq");
var mq_2 = require("./libs/mq");
exports.container = new inversify_1.Container();
exports.provider = inversify_binding_decorators_1.makeFluentProvideDecorator(exports.container);
exports.container.bind(crawler_common_1.Types._plugin).to(mq_1.MQueuePlugin);
exports.container.bind(mq_2.MQueueService).toSelf();
//# sourceMappingURL=container.js.map