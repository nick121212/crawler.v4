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
    .ready(async () => {
        console.log("ready");
        /**
         * 1. 地址queue化
         * 2. 下载页面
         * 3. 分析结果
         * 4. url存入elasticsearch
         * 5. url放入queue
         */
        // await seneca.seneca.actAsync(`role:${pluginTaskName},cmd:add`, require("./config/test1").default);
    });

