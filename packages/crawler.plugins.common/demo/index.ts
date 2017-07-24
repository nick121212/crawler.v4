import { Seneca } from "../src/index";
import { Container } from "inversify";
import { MathPlugin } from "./plugins/math";
import { Types } from "../src/libs/contansts/config";
import { aaa } from "./aaa";

let container = new Container();
let seneca = new Seneca(container);

container.bind<MathPlugin>(Types._plugin).to(MathPlugin);
container.bind<aaa>(aaa).toSelf();

seneca.initPlugin();

seneca.seneca.ready(async () => {
    let add: { data: number } = await seneca.seneca.actAsync("role:math,cmd:add", { left: 1, right: 2 });
    let remove: { data: number } = await seneca.seneca.actAsync("role:math,cmd:remove", { left: 1, right: 2 });

    console.log(add.data + remove.data);
});