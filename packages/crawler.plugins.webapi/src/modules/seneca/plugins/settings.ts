import * as Seneca from "seneca";
import inversify, { injectable, inject } from "inversify";
import { Plugin, Add, Validate } from "crawler.plugins.common";
import * as Joi from "joi";

import { pluginName } from "../constants";

@Plugin(pluginName)
@injectable()
export class SettingsPlugin {
    /**
     * 启动一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    @Add(`role:${pluginName},cmd:add`)
    private async addToTask(
        config: any,
        options?: any,
        globalOptions?: any
        ) {
        let task = options.seneca.make$("settings", {
            id: config.key,
            ...config
        });
        let instance = await task.saveAsync();

        return instance;
    }

    /**
     * 删除一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    @Add(`role:${pluginName},cmd:remove`)
    private async removeFromTask({ key, purge }: { key: string, purge: boolean }, options: any, globalOptions: any) {
        let entity = options.seneca.make$("settings");

        await entity.removeAsync({ id: key });
    }

    /**
     * 列出所有
     * @param param0
     * @param options
     * @param globalOptions
     */
    @Add(`role:${pluginName},cmd:list`)
    private async listTask({ config = {} }: { config: any }, options: any, globalOptions: any) {
        let entity = options.seneca.make$("settings");

        return await entity.listAsync(config);
    }
}
