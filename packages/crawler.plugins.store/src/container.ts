import * as inversify from "inversify";
import { Container } from "inversify";
import { Types as CommonTypes, PluginBase } from "crawler.plugins.common";

import { EsStorePlugin } from "./plugins/elastic";

export const container: inversify.interfaces.Container = new Container();

container.bind<PluginBase>(CommonTypes._plugin).to(EsStorePlugin).inSingletonScope().whenAnyAncestorNamed("EsStorePlugin");
