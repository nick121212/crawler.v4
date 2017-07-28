import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Seneca } from 'crawler.plugins.common';

import { container } from './container';
import { pluginName } from './constants';

import config from './config/test';
import * as bluebird from 'bluebird';

const HOST = process.env.HOST || process.argv[2] || "0.0.0.0";
const BASES = (process.env.BASES || process.argv[3] || '').split(',');
const PORT = process.env.PORT;
const BROADCAST = process.env.BROADCAST;
const REGISTRY = JSON.parse(process.env.REGISTRY || '{"active":true}');

let seneca = new Seneca(container, {
    tag: pluginName
});

seneca.initPlugin({
    "crawler.plugin.mq": {
        url: "amqp://nick:111111@47.92.126.120/%2Fcrawler",
        options: {}
    }
});

seneca.seneca
    .use('redis-store', {
        uri: "redis://47.92.126.120:6379",
        options: {}
    })
    .use('consul-registry', {
        host: '47.92.126.120'
    })
    .use("mesh", {
        auto: true,
        isbase: true,
        host: HOST,
        port: PORT,
        discover: {
            registry: {
                active: true
            }
        },
        listen: [{
            pin: `role:${pluginName},cmd:mq`,
        }]
    }).ready(async () => {
        console.log("ready");
        seneca.seneca.act(`role:${pluginName},cmd:add`, { config: config }, console.log);

        setTimeout(async() => {
            seneca.seneca.act(`role:${pluginName},cmd:remove`, { config: config }, console.log);

            await bluebird.delay(5000);
        }, 5000);

        // 

        // 
    });

