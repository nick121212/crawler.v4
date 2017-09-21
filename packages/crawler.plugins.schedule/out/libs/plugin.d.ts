import { BasePluginModel, SchedulePluginModel } from "../models/plugin";
import { SettingModel } from "../models/setting";
export declare class ExecutePluginService {
    /**
     * 获取链接对应的配置，然后调用插件
     * @param seneca seneca
     * @param config 配置
     * @param data   数据
     */
    preExecute(seneca: any, config: SettingModel, data: any): Promise<any>;
    /**
     * 调用插件流
     * @param seneca  seneca
     * @param plugins 插件列表
     * @param data    数据
     */
    executePlugins(seneca: any, plugins: SchedulePluginModel[], data?: any): Promise<any>;
    /**
     * 调用单个插件
     * 1. 判断条件是否满足；
     * 2. 执行插件，入错出错，重复执行，最多执行retry次；
     * 3. 处理数据，返回data
     * @param seneca seneca
     * @param plugin 插件实例
     * @param data   数据
     */
    executePlugin(seneca: any, plugin: BasePluginModel, data?: any): Promise<any>;
    /**
     * 检测当前配置的模式是否存在，不存在则报错
     * @param seneca   seneca实例
     * @param plugins  插件列表
     */
    private checkParttens(seneca, plugins);
}
