import * as Seneca from "seneca";
import inversify, { injectable, inject } from "inversify";
import { Plugin, Add, Wrap, Init } from "crawler.plugins.common";
import * as bluebird from "bluebird";
import * as _ from "lodash";

import { pluginMqName, pluginTaskName } from "../constants";
import { MQueueService } from "../libs/mq";

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
    @Add(`role:${pluginMqName},cmd:addItemToQueue`)
    private async addToQueue(config: any, options?: any, globalOptions?: any) {
        let mqService: any = await options.seneca.actAsync(`role:${pluginTaskName},cmd:getOne`, config);

        if (mqService && config.items && config.items.length) {
            mqService.addItemsToQueue(config.items, config.routingKey);
        }

        return;
    }

    @Init()
    private async init(msg: any, options: any, globalOptions: any) {
        await bluebird.delay(200);
    }
}
