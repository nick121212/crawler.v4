import "reflect-metadata";
import { injectable, inject } from "inversify";
import { Seneca } from "crawler.plugins.common";

import { container } from "./container";

let seneca = new Seneca(container, {
    tag: "crawler.plugins.base"
});

seneca.seneca
    .ready(() => {
        console.log("crawler.plugins.base ready!");
    });

