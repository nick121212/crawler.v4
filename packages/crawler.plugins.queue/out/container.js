"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var crawler_plugins_common_1 = require("crawler.plugins.common");
// import { modelProxy, IProxyCtx, IInterfaceModel, IExecute } from 'modelproxy';
var inversify_binding_decorators_1 = require("inversify-binding-decorators");
// import { RequestEngine } from './engines/request';
// import { Proxy } from "./proxy";
var queue_1 = require("./plugins/queue");
exports.container = new inversify_1.Container();
exports.provider = inversify_binding_decorators_1.makeFluentProvideDecorator(exports.container);
// inversify.decorate(inversify.injectable(), modelProxy.Compose);
// inversify.decorate(inversify.injectable(), modelProxy.BaseEngine);
// container.bind<Proxy>(Proxy).to(Proxy).inSingletonScope();
// container.bind<inversify.interfaces.Factory<Proxy>>("Factory<Proxy>").toFactory<Proxy>((context: inversify.interfaces.Context) => {
//     return () => {
//         console.log("get Proxy");
//         return container.get<Proxy>(Proxy);
//     };
// });
// container.bind<RequestEngine>(Types.engine).to(RequestEngine);
exports.container.bind(crawler_plugins_common_1.Types._plugin).to(queue_1.QueuePlugin);
//# sourceMappingURL=container.js.map