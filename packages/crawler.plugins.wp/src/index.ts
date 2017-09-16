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
        let data = {
            "_id": "f9f854723afaf88629e32415376a2925",
            "esIndex": "blog",
            "esType": "mamilove.blog"
        };

        setTimeout(async () => {
            await seneca.seneca.actAsync("role:crawler.plugin.wp,cmd:qa", data);
        }, 2000);
    });

