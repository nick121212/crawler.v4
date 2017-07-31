import * as inversify from 'inversify';
import { Container } from "inversify";
import { Types as CommonTypes } from 'crawler.plugins.common';
import { modelProxy, IProxyCtx, IInterfaceModel, IExecute } from 'modelproxy';
import { makeFluentProvideDecorator } from "inversify-binding-decorators";

import { RequestEngine } from './engines/request';
import { Types } from "./constants";
import { Proxy } from "./proxy";
import { DownloadPlugin } from "./plugins/download";


export const container: inversify.interfaces.Container = new Container();
export const provider: any = makeFluentProvideDecorator(container);

inversify.decorate(inversify.injectable(), modelProxy.Compose);
inversify.decorate(inversify.injectable(), modelProxy.BaseEngine);

container.bind<Proxy>(Proxy).to(Proxy).inSingletonScope();
// container.bind<inversify.interfaces.Factory<Proxy>>("Factory<Proxy>").toFactory<Proxy>((context: inversify.interfaces.Context) => {
//     return () => {
//         console.log("get Proxy");
//         return container.get<Proxy>(Proxy);
//     };
// });
container.bind<RequestEngine>(Types.engine).to(RequestEngine);
container.bind<DownloadPlugin>(CommonTypes._plugin).to(DownloadPlugin);
