import * as Seneca from 'seneca';
import * as bluebird from 'bluebird';
import * as _ from 'lodash';
import * as amqplib from 'amqplib';
import { injectable } from "inversify";

import { pluginTaskName, pluginResultName } from '../constants';

export interface IPlugin {
    partten: string;
    data: Object;
}

@injectable()

export class ExecutePluginService {
    /**
     * 从message中提取queueItem数据
     * @param msg   消息
     */
    public getQueueItemFromMsg(msg: amqplib.Message): any {
        let queueItem;

        try {
            queueItem = JSON.parse(msg.content.toString());
        } catch (e) {
            console.log(e);
            throw e;
        }

        return queueItem;
    }

    /**
     * 执行插件列表
     * @param seneca 
     * @param plugins 
     * @param msg 
     */
    public async execute(seneca: any, plugins: Array<any>, msg?: amqplib.Message) {
        let rtn: any = {
            queueItem: msg ? this.getQueueItemFromMsg(msg) : null
        }, index = 0;
        let nn = Date.now();

        // 验证partten的合法性
        this.checkParttens(seneca, plugins);
        // 执行单个插件
        while (index < plugins.length) {
            let plugin = plugins[index];
            let jsonata = {};

            // 处理需要的数据
            if (plugin.jsonata) {
                let ddd = await seneca.actAsync(`role:crawler.plugin.transform,cmd:muti`, {
                    data: rtn,
                    expressions: plugin.jsonata
                });
                ddd.result.forEach((r: any) => {
                    jsonata = Object.assign({}, jsonata, r || {});
                });
                // console.log(`${plugin.partten}`, "调用transform:", jsonata);
            }

            // console.log(`开始调用${plugin.partten};参数为：${JSON.stringify(Object.assign({}, jsonata, plugin.data))}`);
            // 调用接口
            let ccc = await seneca.actAsync(plugin.partten, Object.assign({}, jsonata, plugin.data));

            console.log(`调用${plugin.partten}成功！`);

            if (plugin.result) {
                let ddd = await seneca.actAsync(`role:crawler.plugin.transform,cmd:single`, {
                    data: ccc,
                    expression: plugin.result
                });

                rtn = seneca.util.deepextend({}, rtn, ddd.result || {});
            }

            index++;
        }

        console.log(Date.now() - nn);

        return rtn;
    }

    /**
     * 检测当前配置的模式是否存在，不存在则报错
     * @param seneca   seneca实例
     * @param plugins  插件列表
     */
    private checkParttens(seneca: any, plugins: Array<IPlugin>) {
        _.each(plugins, (plugin) => {
            if (!seneca.has(plugin.partten)) {
                console.log(`没有发现partten: ${plugin.partten}`);
                return new Error(`没有找到partten:${plugin.partten}`);
            }
        });

        return true;
    }
};
