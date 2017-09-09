

import { Seneca } from "crawler.plugins.common";
import { container } from "./container";

let seneca = new Seneca<any>(container, {
    tag: "crawler.plugins.transform"
});


seneca.seneca.ready(async () => {
    console.log("crawler.plugins.transform ready!");

    // let a = await seneca.seneca.actAsync("role:crawler.plugin.transform,cmd:single", { expression: "$sum($.*)", data: { a: 1,b:2,c:4 } })
    // let abc = await seneca.seneca.actAsync("role:crawler.plugin.transform,cmd:muti", { expressions: ["a", "b", "c"], data: { a: 1, b: 2, c: 3 } })
    // console.log(a, abc);
});
