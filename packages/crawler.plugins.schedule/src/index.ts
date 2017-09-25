import "reflect-metadata";
import { injectable, inject } from "inversify";
import { Seneca } from "crawler.plugins.common";

import { container } from "./container";
import { pluginMqName, pluginTaskName } from "./constants";
import { MQueueService } from "./libs/mq";

// import config from "./config/test";

let seneca = new Seneca(container, {
    tag: "crawler.plugins.schedule"
});

seneca.seneca
    .ready(async () => {
        console.log("crawler.plugins.schedule ready!");
        // await seneca.seneca.actAsync(`role:${pluginTaskName},cmd:add`, require("./config/milove").default);
        // await seneca.seneca.actAsync(`role:${pluginTaskName},cmd:add`, require("./config/milove.blog").default);
        // await seneca.seneca.actAsync(`role:${pluginTaskName},cmd:queueInfo`, { key: "bijia" }).catch(console.log);

        // await seneca.seneca.actAsync(`role:${pluginTaskName},cmd:forever`);
    });
