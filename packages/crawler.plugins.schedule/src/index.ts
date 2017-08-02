import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Seneca } from 'crawler.plugins.common';

import { container } from './container';
import { pluginMqName, pluginTaskName } from './constants';

// import config from './config/test';

let seneca = new Seneca(container, {
    tag: "crawler.plugins.schedule"
});

seneca.seneca
    // .use('redis-store', {
    //     uri: "redis://123.59.44.152:6379",
    //     options: {}
    // })
    // .use('consul-registry', {
    //     host: '123.59.44.152'
    // })
    // .use("mesh", {
    //     // auto: true,
    //     isbase: true,
    //     host: "127.0.0.1",
    //     port: 40001,
    //     // discover: {
    //     //     registry: {
    //     //         active: true
    //     //     }
    //     // },
    //     // pins: [`role:${pluginMqName},cmd:*`,`role:${pluginTaskName},cmd:*`]
    //     listen: [{
    //         pin: `role:${pluginMqName},cmd:*`
    //     }, {
    //         pin: `role:${pluginTaskName},cmd:*`
    //     }]
    // })
    .ready(async () => {
        seneca.initPlugin({
            "crawler.plugin.mq": {
                "url": "amqp://nick:111111@47.92.126.120/%2Fcrawler",
                "options": {}
            }
        });

        console.log("ok");
        // seneca.seneca.act(`role:${pluginName},cmd:add`, { config: config });
        setTimeout(async () => {
            // await seneca.seneca.actAsync(`role:${pluginName},cmd:remove`, { config: config });
            // await bluebird.delay(5000);
        }, 5000);
    });

