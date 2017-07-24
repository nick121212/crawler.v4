import * as Seneca from 'seneca';
import inversify, { injectable, inject } from 'inversify';
import { Plugin, Add, Wrap, Init } from 'crawler.common';

import { pluginName } from "../constants";
import * as bluebird from 'bluebird';

@Plugin(pluginName)
@injectable()
export class MQueuePlugin {
    @Add(`role:${pluginName},cmd:add`)
    async addToQueue(msg: any) {
        // let mQueueService = 
    }

    @Init()
    async init(msg: any, options: any, globalOptions: any) {
        console.log("init");

        console.log(globalOptions);

        await bluebird.delay(2000);
    }
}