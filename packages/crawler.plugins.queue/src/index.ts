import "reflect-metadata";
import { Seneca } from "crawler.plugins.common";

import { container } from "./container";
import { pluginName } from "./constants";

let seneca = new Seneca(container, {
    tag: pluginName
});

seneca.seneca
    .ready(async () => {
        console.log("crawler.plugins.queue ready");
    });

