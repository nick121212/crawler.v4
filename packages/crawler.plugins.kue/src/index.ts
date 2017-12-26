

import { Seneca } from "crawler.plugins.common";
import { container } from "./container";

let seneca = new Seneca<any>(container, {
    tag: "crawler.plugins.kue"
});

seneca.seneca.ready(async () => {
    console.log("crawler.plugins.kue ready!");

    // seneca.seneca.act(`role:crawler.plugin.kue,cmd:create`, {
    //     type: "seneca-schedule",
    //     unique: "seneca-schedule-group1",
    //     data: {
    //         partten: "role:crawler.plugin.transform,cmd:single",
    //         data: {
    //             expression: "$$.a",
    //             data: { a: 1 }
    //         }
    //     },
    //     removeOnComplete: false,
    //     every: "5 seconds"
    // }, (err: Error, res: any) => {
    //     // console.log(res);
    // });

});
