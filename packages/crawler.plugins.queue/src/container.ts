import * as inversify from "inversify";
import { Container } from "inversify";
import { Types as CommonTypes, PluginBase } from "crawler.plugins.common";

import { QueuePlugin } from "./plugins/queue";

export const container: inversify.interfaces.Container = new Container();

container.bind<PluginBase>(CommonTypes._plugin).to(QueuePlugin).inSingletonScope().whenNoAncestorNamed("QueuePlugin");
