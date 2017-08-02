import * as inversify from 'inversify';
import { Container } from "inversify";
import { makeFluentProvideDecorator } from "inversify-binding-decorators";
import { Types as CommonTypes, PluginBase } from 'crawler.plugins.common';

import { HtmlPlugin } from "./plugins/html";

export const container: inversify.interfaces.Container = new Container();

container.bind<PluginBase>(CommonTypes._plugin).to(HtmlPlugin).inSingletonScope().whenNoAncestorNamed("HtmlPlugin");
