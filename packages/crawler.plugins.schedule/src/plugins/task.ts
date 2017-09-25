import * as Seneca from "seneca";
import inversify, { injectable, inject } from "inversify";
import { Plugin, Add, Wrap, Init } from "crawler.plugins.common";
import * as bluebird from "bluebird";
import * as _ from "lodash";
import * as amqplib from "amqplib";

import { pluginTaskName } from "../constants";
import { MQueueService } from "../libs/mq";
import { ExecutePluginService } from "../libs/plugin";
import { SettingModel } from "../models/setting";

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

    /**
     * 获取queue的名称
     * @param config.key 主键
     */
    private getUrlQueueName(config: { key: string }) {
        return `crawler.url.${config.key}`;
    }

    /**
     * 判断是否有queueService
     * @param queueName queue名称
     */
    private has(queueName: string): boolean {
        let mQueueServie = _.first(_.filter(this.mqs, (mq: MQueueService) => {
            return mq.queueName === queueName;
        }));

        return !!mQueueServie;
    }

    /**
     * 获取一个queueService实例
     * @param config  参数
     */
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

    /**
     * 数据入到Queue
     * @param config 数据
     */
    @Add(`role:${pluginTaskName},cmd:addItemToQueue`)
    private async addToQueue(config: any) {
        let mqService: any = this.getQueueService(config);

        if (!mqService) {
            throw new Error("没有激活的mqService！");
        }

        // console.log("----------------itmes:", config.items);
        if (config.items && config.items.length) {
            let res = mqService.addItemsToQueue(config.items, config.routingKey);
            // console.log("addToQueue 结果 :", res);
        }
    }

    /**
     * 启动一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    @Add(`role:${pluginTaskName},cmd:add`)
    private async addToTask(
        config: SettingModel,
        options?: any,
        globalOptions?: any
        ) {
        let queueName = this.getUrlQueueName(config);

        // throw new Error("test");

        // 如果已经存在，则忽略
        if (this.has(queueName)) {
            return;
        }

        // 创建queueService
        let mQueueService = new MQueueService();
        let task = options.seneca.make$("tasks", {
            id: config.key,
            ...config
        });
        let instance = await task.saveAsync();
        this.mqs.push(mQueueService);

        // 开始消费queue
        if (mQueueService.initConsume(globalOptions,
            queueName,
            options.seneca.actAsync.bind(options.seneca, config.startPartten), config)
        ) {
            // 如果queue里面没有消息，则调用initFlow队列
            if (config.initFlow && config.initFlow.length) {
                await this.pluginService.executePlugins(options.seneca, config.initFlow, {}).catch(console.error);
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
    private async removeFromTask({ key, purge }: { key: string, purge: boolean }, options: any, globalOptions: any) {
        let mQueueServie = this.getQueueService({ key });

        if (!mQueueServie) {
            console.log("没有找到service");
            return;
        }

        let entity = options.seneca.make$("tasks");

        await entity.removeAsync({ id: key });
        await mQueueServie.destroy(purge);

        _.remove(this.mqs, mQueueServie);
    }

    /**
     * 列出所有
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
     * 获取queue的消费信息
     * @param key      queue的key
     * @param options  参数
     */
    @Add(`role:${pluginTaskName},cmd:queueInfo`)
    private async getQueue({ key }: { key: string }, options: any) {
        let mQueueServie = this.getQueueService({ key });

        if (!mQueueServie) {
            console.log("没有找到mqService");
            throw new Error("没有找到mqService");
        }

        return mQueueServie.getQueueMessageCount(mQueueServie.queueName);
    }

    @Add(`role:${pluginTaskName},cmd:forever`)
    private async forever(msg: any, options: any, globalOptions: any) {
        let entity = options.seneca.make$("tasks");
        let tasks = await entity.listAsync({});

        setInterval(() => {
            _.forEach(tasks, async (task: any) => {
                if (task.id && !this.mqs[task.id]) {
                    // await options.seneca.actAsync(`role:${pluginTaskName},cmd:add`, task);
                    await this.addToTask(task, options, globalOptions).catch(console.log);
                }
            });
        }, 600);
    }

    /**
     * 启动未正常停止的队列
     * @param msg
     * @param options
     * @param globalOptions
     */
    @Init()
    private async init(msg: any, options: any, globalOptions: any) {
        await bluebird.delay(200);
    }
}
