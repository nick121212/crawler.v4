import * as Seneca from "seneca";
import * as bluebird from "bluebird";
import * as _ from "lodash";
import * as amqplib from "amqplib";
import { injectable } from "inversify";
import * as pathToRegexp from "path-to-regexp";
import * as log4js from "log4js";

import { pluginTaskName, pluginResultName } from "../constants";
import { BasePluginModel, SchedulePluginModel } from "../models/plugin";
import { SettingModel } from "../models/setting";

@injectable()

export class ExecutePluginService {
    /**
     * 获取链接对应的配置，然后调用插件
     * @param seneca seneca
     * @param config 配置
     * @param data   数据
     */
    public async preExecute(seneca: any, config: SettingModel, data: any): Promise<any> {
        let msgFlow: Array<any> | null =
            await seneca.actAsync(`role:${pluginResultName},cmd:getFieldFlow`, { pages: config.pages, queueItem: (data || {}).queueItem }).catch(console.log);

        if (!msgFlow || !data) {
            return;
        }

        return this.executePlugins(seneca, msgFlow, data || {}).then((data1: any) => {
            seneca.actAsync("role:crawler.plugin.store.es,cmd:createResult", {
                "esIndex": "test.result",
                "esType": "success",
                "result": { url: data.queueItem.url },
                "_id": Date.now() + Math.random() + data.queueItem._id
            }).catch(console.log);

            // throw new Error("");
        }).catch((err) => {
            seneca.actAsync("role:crawler.plugin.store.es,cmd:createResult", {
                "esIndex": "test.result",
                "esType": "error",
                "_id": Date.now() + Math.random() + data.queueItem._id,
                "result": Object.assign({}, { url: data.queueItem.url }, { errMessage: err.message })
            }).catch(console.log);
        });
    }

    /**
     * 调用插件流
     * @param seneca  seneca
     * @param plugins 插件列表
     * @param data    数据
     */
    public async executePlugins(seneca: any, plugins: SchedulePluginModel[], data: any = {}): Promise<any> {
        let len = plugins.length, currentIndex = 0, currentPlugin;

        // 检测是否可以执行插件
        this.checkParttens(seneca, plugins);
        while (len > currentIndex) {
            currentPlugin = plugins[currentIndex++];

            try {
                let start = Date.now();

                data = await this.executePlugin(seneca, currentPlugin, data);

                if (currentPlugin.successFlow) {
                    try { await this.executePlugins(seneca, currentPlugin.successFlow, data); } catch (e) {
                        console.log("执行了成功插件！");
                    }
                }

                if (!data.__META__) {
                    data.__META__ = { timer: [] };
                }

                data.__META__.timer.push(`[${currentPlugin.title || currentPlugin.partten}]的执行时间：${Date.now() - start}ms`);
                // console.log(`[${currentPlugin.title}]的执行时间：${Date.now() - start}ms`);
            } catch (e) {
                if (currentPlugin.force) {
                    continue;
                }

                if (currentPlugin.errFlow) {
                    try { await this.executePlugins(seneca, currentPlugin.errFlow, data); } catch (e) {
                        console.log("执行了错误插件！");
                    }
                }

                throw e;
            }
        }

        console.log(data.__META__);

        return data;
    }

    /**
     * 调用单个插件
     * 1. 判断条件是否满足；
     * 2. 执行插件，入错出错，重复执行，最多执行retry次；
     * 3. 处理数据，返回data
     * @param seneca seneca
     * @param plugin 插件实例
     * @param data   数据
     */
    public async executePlugin(seneca: any, plugin: BasePluginModel, data: any = {}): Promise<any> {
        // 判断条件是否满足，如果不满足，则跳过插件的调用
        if (plugin.condition) {
            let res = await seneca.actAsync(`role:crawler.plugin.transform,cmd:single`, {
                data,
                expression: plugin.condition
            });

            if (res.result !== true) {
                return data;
            }
        }
        let jsonatas = {};
        if (plugin.jsonata && plugin.jsonata.length) {
            let res = await seneca.actAsync(`role:crawler.plugin.transform,cmd:muti`, {
                data,
                expressions: plugin.jsonata
            });
            res.result.forEach((r: any) => {
                jsonatas = seneca.util.deepextend({}, jsonatas, r || {});
            });
        }

        // 调用插件，重试机制
        let retry = plugin.retry || 1, curRetryIndex = 0, result, isError = false;

        // 最大5次重试
        if (retry > 5) {
            retry = 5;
        }
        while (curRetryIndex < retry) {
            curRetryIndex++;

            try {
                result = await seneca.actAsync(plugin.partten, Object.assign({ timeout$: plugin.timeout || 30000 }, jsonatas, plugin.data));

                break;
            } catch (e) {
                if (curRetryIndex >= retry) {
                    isError = true;
                    if (plugin.force) {
                        break;
                    }
                    throw new Error(plugin.title + "----" + e.message);
                }
            }
        }

        // 调用成功后，处理成功后的数据
        if (plugin.result && !isError) {
            let res = await seneca.actAsync(`role:crawler.plugin.transform,cmd:single`, {
                data: result,
                expression: plugin.result
            });

            data = seneca.util.deepextend({}, data, res.result || {});
        }

        return data;
    }

    /**
     * 检测当前配置的模式是否存在，不存在则报错
     * @param seneca   seneca实例
     * @param plugins  插件列表
     */
    private checkParttens(seneca: any, plugins: Array<BasePluginModel>) {
        _.each(plugins, (plugin) => {
            if (!seneca.has(plugin.partten)) {
                console.log(`没有发现partten: ${plugin.partten}`);
                return new Error(`没有找到partten:${plugin.partten}`);
            }
        });

        return true;
    }
};
