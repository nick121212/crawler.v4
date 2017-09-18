import * as Seneca from "seneca";
import * as bluebird from "bluebird";
import * as _ from "lodash";
import * as amqplib from "amqplib";
import { injectable } from "inversify";
import * as pathToRegexp from "path-to-regexp";
import * as log4js from "log4js";

import { pluginTaskName, pluginResultName } from "../constants";

export interface IPlugin {
    partten: string;
    data: Object;
}


log4js.configure({
    appenders: {
        everything: { type: "file", filename: "all-the-logs.log" }
    },
    categories: {
        default: { appenders: ["everything"], level: "error" }
    },
    replaceConsole: false
} as any);

const logger = log4js.getLogger();

@injectable()

export class ExecutePluginService {
    /**
     * 获取链接对应的配置，然后调用插件
     * @param seneca seneca
     * @param config 配置
     * @param data   数据
     */
    public async preExecute(seneca: any, config: any, data: any): Promise<any> {
        let queueItem = data || null;
        let msgFlow: Array<any> | null = this.getFieldFlow(queueItem || {}, config.pages || []);

        if (!msgFlow || !data) {
            return;
        }

        return this.execute(seneca, msgFlow, data);
    }

    /**
     * 执行插件列表
     * @param seneca  seneca
     * @param plugins 插件配置
     * @param data    数据
     */
    public async execute(seneca: any, plugins: Array<any>, data?: any): Promise<any> {
        let rtn: any = {
            queueItem: data || {}
        }, index = 0;
        let nn = Date.now();

        if (rtn.queueItem) {
            logger.info(`开始调用${rtn.queueItem.url}`);
        }

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
                        jsonata = seneca.util.deepextend({}, jsonata, r || {});
                    });
                }
                let ccc = null;
                // seneca.log.info(`开始调用${plugin.partten}-----------------;`);
                // 调用插件
                try {
                    ccc = await seneca.actAsync(plugin.partten, Object.assign({ timeout$: 30000 }, jsonata, plugin.data));

                    logger.info(`${plugin.partten}返回的数据`, ccc);
                } catch (e) {
                    logger.error(`${plugin.partten}错误数据`);

                    throw e;
                }
                if (plugin.result) {
                    let ddd = await seneca.actAsync(`role:crawler.plugin.transform,cmd:single`, {
                        data: ccc,
                        expression: plugin.result
                    });

                    rtn = seneca.util.deepextend({}, rtn, ddd.result || {});
                }

                logger.info(`调用${plugin.partten}成功！耗时：`, Date.now() - start, "ms");

                index++;
            }

        } catch (e) {
            throw e;
        }

        if (rtn.queueItem) {
            logger.info(`调用${rtn.queueItem.url}用时${Date.now() - nn}`);
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
     * 找到当前queueItem对应的规则配置
     * @param queueItem 链接的数据
     * @param pages     定义的page
     */
    private getFieldFlow(queueItem: any, pages: Array<any>): Array<any> | null {
        let rules = _.filter(pages, ({ path }) => {
            let pathToReg = pathToRegexp(path.toString(), []);

            return pathToReg.test(queueItem.path || "");
        });

        if (!rules.length) {
            console.error(`没有找到${queueItem.url}的匹配规则！`);

            return null;
        }

        return _.first(rules).msgFlow || [];
    }
};
