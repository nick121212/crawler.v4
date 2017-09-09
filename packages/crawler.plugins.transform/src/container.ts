import * as inversify from 'inversify';
import { Container } from 'inversify';
import { Types as CommonTypes, PluginBase } from 'crawler.plugins.common';

import { Types } from './constants';
import { CombineFunc } from './libs/funcs/combine';
import { MomentFunc } from './libs/funcs/moment';

import { TransformExexutePlugin } from './plugins/execute';

export const container: inversify.interfaces.Container = new Container();

container.bind<CombineFunc>(Types.FUNC).to(CombineFunc);
container.bind<MomentFunc>(Types.FUNC).to(MomentFunc);

container.bind<PluginBase>(CommonTypes._plugin).to(TransformExexutePlugin).inSingletonScope().whenAnyAncestorNamed("TransformExexutePlugin");