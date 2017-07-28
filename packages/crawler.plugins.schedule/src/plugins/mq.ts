import * as Seneca from 'seneca';
import inversify, { injectable, inject } from 'inversify';
import { Plugin, Add, Wrap, Init } from 'crawler.plugins.common';
import * as bluebird from 'bluebird';
import * as _ from 'lodash';

import { pluginName } from '../constants';
import { MQueueService } from '../libs/mq';

@Plugin(pluginName)
@injectable()
export class MQueuePlugin {

    private mqs: Array<MQueueService> = [];

    has(key: string): boolean {
        let mQueueServie = _.first(_.filter(this.mqs, (mq: MQueueService) => {
            return mq.config.key === key
        }));

        return !!mQueueServie;
    }

    /**
     * 启动一个任务
     * @param param0 
     * @param options 
     * @param globalOptions 
     */
    @Add(`role:${pluginName},cmd:add`)
    async addToQueue({ config }: { config: any }, options: any, globalOptions: any) {
        if (this.has(config.key)) {
            return;
        }

        let mQueueService = new MQueueService();
        let task = options.seneca.make$('tasks', {
            id: config.key
        });
        let instance = await task.saveAsync();

        this.mqs.push(mQueueService);
        mQueueService.initConsume(globalOptions, config.key, config, 5);

        console.log(this.mqs);

        return;
    }

    @Add(`role:${pluginName},cmd:remove`)
    async removeFromQueue({ config = {} }: { config: any }, options: any, globalOptions: any) {
        let mQueueServie = _.first(_.filter(this.mqs, (mq: MQueueService) => {
            return mq.config.key === config.key
        }));

        if (!mQueueServie) {
            return;
        }

        let entity = options.seneca.make$('tasks');

        await entity.removeAsync({ id: config.key });
        await mQueueServie.destroy();

        _.remove(this.mqs, mQueueServie);

        return;
    }

    @Init()
    async init(msg: any, options: any, globalOptions: any) {
        console.log("init");
        await bluebird.delay(200);
    }
}