import * as Seneca from "seneca";
import inversify, { injectable, inject } from "inversify";
import { Plugin, Add, Wrap, Init } from "crawler.plugins.common";
import * as bluebird from "bluebird";
import * as _ from "lodash";
import * as amqplib from "amqplib";

import { pluginTaskName, pluginResultName } from "../constants";
import { MQueueService } from "../libs/mq";
import { ExecutePluginService } from "../libs/plugin";

@Plugin(pluginTaskName)
@injectable()
export class TaskPlugin {

    /**
     * 当前正在执行的task列表
     */
    private mqs: Array<MQueueService> = [];

    /**
     * 执行插件列表的服务
     */
    @inject(ExecutePluginService)
    private pluginService: ExecutePluginService;

    private getUrlQueueName(config: { key: string }) {
        return `crawler.url.${config.key}`;
    }

    private has(queueName: string): boolean {
        let mQueueServie = _.first(_.filter(this.mqs, (mq: MQueueService) => {
            return mq.queueName === queueName;
        }));

        return !!mQueueServie;
    }

    @Add(`role:${pluginTaskName},cmd:getOne`)
    private getQueueService(config: any): MQueueService | null {
        let queueName = this.getUrlQueueName(config);
        if (this.has(queueName)) {
            let mQueueServie: MQueueService = _.first(_.filter(this.mqs, (mq: MQueueService) => {
                return mq.queueName === queueName;
            })) as MQueueService;

            return mQueueServie;
        }

        return null;
    }

    @Add(`role:${pluginTaskName},cmd:testFlow`)
    private async testFlow(config: any, options?: any, globalOptions?: any): Promise<any> {
        await this.pluginService.execute(options.seneca, config.msgFlow);

        return null;
    }

    /**
     * 启动一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    @Add(`role:${pluginTaskName},cmd:add`)
    private async addToTask(config: { key: string, prefech: number, msgPlugins: Array<any>, initFlow: Array<any> }, options?: any, globalOptions?: any) {
        let queueName = this.getUrlQueueName(config);

        if (!this.has(queueName)) {
            let mQueueService = new MQueueService();
            let task = options.seneca.make$("tasks", {
                id: config.key,
                ...config
            });
            let instance = await task.saveAsync();
            this.mqs.push(mQueueService);
            if (mQueueService.initConsume(globalOptions, queueName, this.pluginService.preExecute.bind(this.pluginService, options.seneca, config), config.prefech || 1)) {
                this.pluginService.execute(options.seneca, config.initFlow);
            }
        }
    }

    /**
     * 删除一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    @Add(`role:${pluginTaskName},cmd:remove`)
    private async removeFromTask({ config = {} }: { config: any }, options: any, globalOptions: any) {
        let mQueueServie = this.getQueueService(config);

        if (!mQueueServie) {
            return;
        }

        let entity = options.seneca.make$("tasks");

        await entity.removeAsync({ id: config.key });
        await mQueueServie.destroy();

        _.remove(this.mqs, mQueueServie);
    }

    /**
     * 删除一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    @Add(`role:${pluginTaskName},cmd:list`)
    private async listTask({ config = {} }: { config: any }, options: any, globalOptions: any) {
        let entity = options.seneca.make$("tasks");

        return await entity.listAsync(config);
    }

    /**
     * 启动未正常停止的队列
     * @param msg
     * @param options
     * @param globalOptions
     */
    @Init()
    private async init(msg: any, options: any, globalOptions: any) {
        let entity = options.seneca.make$("tasks");
        let tasks = await entity.listAsync({});

        setInterval(() => {
            _.forEach(tasks, async (task: any) => {
                if (task.id && !this.mqs[task.id]) {
                    await this.addToTask(task, options, globalOptions);
                }
            });
        }, 60000);


        await bluebird.delay(200);
    }
}
