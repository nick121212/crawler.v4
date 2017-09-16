import * as inversify from "inversify";
import { Container } from "inversify";
import { Types as CommonTypes, PluginBase } from "crawler.plugins.common";

import { WpPlugin } from "./plugins/wp";

export const container: inversify.interfaces.Container = new Container();

container.bind<PluginBase>(CommonTypes._plugin).to(WpPlugin).inSingletonScope().whenNoAncestorNamed("WpPlugin");
