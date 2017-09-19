import * as Seneca from "seneca";
import inversify, { injectable, inject } from "inversify";
import { Plugin, Add, Wrap, Init, Validate } from "crawler.plugins.common";
import * as _ from "lodash";
import * as pathToRegexp from "path-to-regexp";
import * as Joi from "joi";

import { pluginResultName } from "../constants";
import { ExecutePluginService } from "../libs/plugin";

@Plugin(pluginResultName)
@injectable()
export class PluginPlugin {

    /**
     * 执行插件列表的服务
     */
    @inject(ExecutePluginService)
    private pluginService: ExecutePluginService;

    /**
    * 找到当前queueItem对应的规则配置
    * @param queueItem 链接的数据
    * @param pages     定义的page
    */
    @Add(`role:${pluginResultName},cmd:addItemToQueue`)
    private getFieldFlow(
        { queueItem, pages }: { queueItem: any, pages: Array<any> }
        ): Array<any> | null {
        let rules = _.filter(pages, ({ path }) => {
            let pathToReg = pathToRegexp(path.toString(), []);

            return pathToReg.test(queueItem.path || "");
        });

        if (!rules.length) {
            console.error(`没有找到${queueItem.path}的匹配规则！`);

            return null;
        }

        return _.first(rules).msgFlow || [];
    }

    /**
     * 测试一个流
     * @param config        流配置
     * @param options       seneca的options
     * @param globalOptions 全局options
     */
    @Add(`role:${pluginResultName},cmd:testFlow`)
    private async testFlow(
        @Validate(Joi.object().keys({
            msgFlow: Joi.array().required(),
            data: Joi.any().required()
        }), { allowUnknown: true }) config: any,
        options?: any,
        globalOptions?: any
        ): Promise<any> {
        let rtn: any = await this.pluginService.execute(options.seneca, config.msgFlow, config.data);

        return rtn;
    }
}
