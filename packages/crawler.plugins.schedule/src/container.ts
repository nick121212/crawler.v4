import * as inversify from 'inversify';
import { Container } from "inversify";
import { Types as CommonTypes } from 'crawler.plugins.common';
import { makeFluentProvideDecorator } from "inversify-binding-decorators";

import { MQueuePlugin } from "./plugins/mq";

import { MQueueService } from "./libs/mq";

export const container: inversify.interfaces.Container = new Container();
// export const provider: any = makeFluentProvideDecorator(container);

container.bind<MQueuePlugin>(CommonTypes._plugin).to(MQueuePlugin).inSingletonScope();
container.bind<MQueueService>(MQueueService).toSelf();