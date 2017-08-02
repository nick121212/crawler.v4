import * as Seneca from 'seneca';
import inversify, { injectable, inject } from 'inversify';
import { Plugin, Add, Wrap, Init } from 'crawler.plugins.common';
import * as bluebird from 'bluebird';
import * as _ from 'lodash';

import { pluginTaskName } from '../constants';
import { MQueueService } from '../libs/mq';

@Plugin(pluginTaskName)
@injectable()
export class TaskPlugin {

    /**
     * 当前正在执行的task列表
     */
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
    @Add(`role:${pluginTaskName},cmd:add`)
    async addToTask({ config }: { config: any }, options?: any, globalOptions?: any) {
        if (this.has(config.key)) {
            return;
        }

        let mQueueService = new MQueueService();
        let task = options.seneca.make$('tasks', {
            id: config.key,
            ...config
        });
        let instance = await task.saveAsync();

        this.mqs.push(mQueueService);

        mQueueService.initConsume(globalOptions, config.key, config, 5);
    }

    /**
     * 删除一个任务
     * @param param0 
     * @param options 
     * @param globalOptions 
     */
    @Add(`role:${pluginTaskName},cmd:remove`)
    async removeFromTask({ config = {} }: { config: any }, options: any, globalOptions: any) {
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
    }

    /**
     * 启动未正常停止的队列
     * @param msg 
     * @param options 
     * @param globalOptions 
     */
    @Init()
    async init(msg: any, options: any, globalOptions: any) {
        let entity = options.seneca.make$('tasks');
        let tasks = await entity.listAsync({});

        _.forEach(tasks, async (task: any) => {
            if (task.id && !this.mqs[task.id]) {
                await this.addToTask({ config: task }, options, globalOptions);
            }
        });

        await bluebird.delay(200);
    }
}