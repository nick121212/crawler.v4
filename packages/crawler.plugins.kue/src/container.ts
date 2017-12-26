import * as inversify from "inversify";
import { Container } from "inversify";
import { Types as CommonTypes, PluginBase } from "crawler.plugins.common";

import { KuePlugin } from "./plugins/kue";
import { KueService } from "./libs/kue";

export const container: inversify.interfaces.Container = new Container();

container.bind<PluginBase>(CommonTypes._plugin).to(KuePlugin).inSingletonScope().whenAnyAncestorNamed("KuePlugin");
container.bind<KueService>(KueService).toSelf();
