import * as inversify from 'inversify';
import { Container } from "inversify";
import { modelProxy, IProxyCtx, IInterfaceModel, IExecute } from 'modelproxy';
import { makeFluentProvideDecorator } from "inversify-binding-decorators";
import { Types as CommonTypes, PluginBase } from 'crawler.plugins.common';

import { RequestEngine } from './engines/request';
import { SuperAgentEngine } from './engines/superagent';

import { Types } from "./constants";
import { Proxy } from "./proxy";
import { DownloadPlugin } from "./plugins/download";


export const container: inversify.interfaces.Container = new Container();
export const provider: any = makeFluentProvideDecorator(container);

inversify.decorate(inversify.injectable(), modelProxy.Compose);
inversify.decorate(inversify.injectable(), modelProxy.BaseEngine);

container.bind<Proxy>(Proxy).to(Proxy).inSingletonScope();
container.bind<RequestEngine>(Types.engine).to(RequestEngine).inSingletonScope();
container.bind<SuperAgentEngine>(Types.engine).to(SuperAgentEngine).inSingletonScope();

container.bind<PluginBase>(CommonTypes._plugin).to(DownloadPlugin).inSingletonScope().whenNoAncestorNamed("DownloadPlugin");
