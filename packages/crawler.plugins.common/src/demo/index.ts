import { Seneca, IConfig } from "../index";
import { Container } from "inversify";
import { MathPlugin } from "./plugins/math";
import { MathPlugin1 } from "./plugins/math.1";

import { aaa } from "./aaa";
import { IPlugin, PluginBase, SenecaConfig, Types } from "../index";

let container = new Container();
let seneca = new Seneca<IConfig>(container, { log: "test" });

container.bind<MathPlugin>(Types._plugin).to(MathPlugin).inSingletonScope().whenTargetNamed("MathPlugin");
container.bind<MathPlugin1>(Types._plugin).to(MathPlugin1).inSingletonScope().whenTargetNamed("MathPlugin1");

container.bind<aaa>(aaa).toSelf();

seneca.initPlugin();

seneca.seneca.ready(async () => {
    let add: { data: number } = await seneca.seneca.actAsync("role:math,cmd:add", { left: 1, right: 2 });
    let remove: { data: number } = await seneca.seneca.actAsync("role:math,cmd:remove", { left: 1, right: 2 });

    console.log(add.data + remove.data);
});