import * as Seneca from 'seneca';
import inversify, { injectable, inject } from 'inversify';
import { Plugin, Add, Wrap, Init } from 'crawler.plugins.common';
import * as bluebird from 'bluebird';
import * as _ from 'lodash';

import { pluginMqName } from '../constants';
import { MQueueService } from '../libs/mq';

@Plugin(pluginMqName)
@injectable()
export class MQueuePlugin {

    /**
     * 注入一个mq服务
     */
    @inject(MQueueService)
    private mqService: MQueueService;

    /**
     * 启动一个任务
     * @param param0 
     * @param options 
     * @param globalOptions 
     */
    @Add(`role:${pluginMqName},cmd:add`)
    async addToQueue({ config }: { config: any }, options?: any, globalOptions?: any) {

    }

    @Init()
    async init(msg: any, options: any, globalOptions: any) {
        console.log("init");
        await bluebird.delay(200);
    }
}