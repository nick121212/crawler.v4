import "reflect-metadata";
import { injectable, inject } from "inversify";
import { Seneca } from "crawler.plugins.common";

import { container } from "./container";

let seneca = new Seneca(container, {
    tag: "crawler.plugin.wp"
});

seneca.seneca
    .ready(async () => {
        console.log("crawler.plugins.wp ready!");
        
        // await seneca.seneca.actAsync("role:crawler.plugin.wp,cmd:yl", {});
    });

