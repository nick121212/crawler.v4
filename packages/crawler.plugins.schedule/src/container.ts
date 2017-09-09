import * as inversify from 'inversify';
import { Container } from "inversify";
import { Types as CommonTypes, PluginBase } from 'crawler.plugins.common';

import { MQueuePlugin } from "./plugins/mq";
import { TaskPlugin } from "./plugins/task";
// import { ResultPlugin } from "./plugins/result";

import { MQueueService } from "./libs/mq";
import { ExecutePluginService } from './libs/plugin';


export const container: inversify.interfaces.Container = new Container();

container.bind<PluginBase>(CommonTypes._plugin).to(MQueuePlugin).inSingletonScope().whenAnyAncestorNamed("MQueuePlugin");
container.bind<PluginBase>(CommonTypes._plugin).to(TaskPlugin).inSingletonScope().whenAnyAncestorNamed("TaskPlugin");
// container.bind<PluginBase>(CommonTypes._plugin).to(ResultPlugin).inSingletonScope().whenAnyAncestorNamed("ResultPlugin");

container.bind<MQueueService>(MQueueService).toSelf();
container.bind<ExecutePluginService>(ExecutePluginService).toSelf();