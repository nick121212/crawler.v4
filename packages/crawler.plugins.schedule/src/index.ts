import "reflect-metadata";
import { Seneca } from "crawler.plugins.common";

import { container } from "./container";

let seneca = new Seneca(container, {
    tag: "crawler.plugins.schedule"
});

seneca.seneca
    .ready(async () => {
        console.log("crawler.plugins.schedule ready!");

        // seneca.seneca.act(`role:crawler.plugin.kue,cmd:create`, {
        //     type: "schedule-1",
        //     data: {
        //         partten: "role:crawler.plugin.transform,cmd:single",
        //         data: {
        //             expression: "$$.a",
        //             data: { a: 1 }
        //         }
        //     },
        //     every: "2 seconds"
        // }, (err: Error, res: any) => {
        //     console.log(res);
        // });
    });
