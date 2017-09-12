import * as Seneca from "seneca";
import * as bluebird from "bluebird";
import * as _ from "lodash";
import * as amqplib from "amqplib";
import { injectable } from "inversify";
import * as pathToRegexp from "path-to-regexp";

import { pluginTaskName, pluginResultName } from "../constants";

export interface IPlugin {
    partten: string;
    data: Object;
}

@injectable()

export class ExecutePluginService {
    public async preExecute(seneca: any, config: any, msg?: amqplib.Message): Promise<any> {
        let queueItem = msg ? this.getQueueItemFromMsg(msg) : null;
        let msgFlow: Array<any> | null = this.getFieldFlow(queueItem || {}, config.pages || []);

        if (!msgFlow || !msg) {
            return;
        }

        return this.execute(seneca, msgFlow, msg);
    }

    /**
     * 执行插件列表
     * @param seneca 
     * @param plugins 
     * @param msg 
     */
    public async execute(seneca: any, plugins: Array<any>, msg?: amqplib.Message): Promise<any> {
        let rtn: any = {
            queueItem: msg ? this.getQueueItemFromMsg(msg) : null
        }, index = 0;
        let nn = Date.now();

        try {
            // 验证partten的合法性
            this.checkParttens(seneca, plugins);
            // 执行单个插件
            while (index < plugins.length) {
                let plugin = plugins[index];
                let jsonata = {};
                let start = Date.now();

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

                // seneca.log.info(`开始调用${plugin.partten}-----------------;`);
                // 调用接口
                let ccc = await seneca.actAsync(plugin.partten, Object.assign({}, jsonata, plugin.data));

                seneca.log.info(`调用${plugin.partten}成功！耗时：`, Date.now() - start, "ms");

                if (plugin.result) {
                    let ddd = await seneca.actAsync(`role:crawler.plugin.transform,cmd:single`, {
                        data: ccc,
                        expression: plugin.result
                    });

                    rtn = seneca.util.deepextend({}, rtn, ddd.result || {});
                }
                index++;
            }

        } catch (e) {
            throw e;
        }

        if (rtn.queueItem) {
            seneca.log.info(`调用${rtn.queueItem.url}用时${Date.now() - nn}`);
        }

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
    /**
    * 从message中提取queueItem数据
    * @param msg   消息
    */
    private getQueueItemFromMsg(msg: amqplib.Message): any {
        let queueItem;

        try {
            queueItem = JSON.parse(msg.content.toString());
        } catch (e) {
            console.log(e);
            throw e;
        }

        return queueItem;
    }

    private getFieldFlow(queueItem: any, pages: Array<any>): Array<any> | null {
        let rules = _.filter(pages, ({ path }) => {
            let pathToReg = pathToRegexp(path.toString(), []);

            return pathToReg.test(queueItem.path || "");
        });

        if (!rules.length) {
            console.error(`没有找到${queueItem.url}的匹配规则！`);

            return null;
        }

        // console.log(_.first(rules).title || "");

        return _.first(rules).msgFlow || [];
    }
};
