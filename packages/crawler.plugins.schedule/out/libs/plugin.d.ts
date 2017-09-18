export interface IPlugin {
    partten: string;
    data: Object;
}
export declare class ExecutePluginService {
    /**
     * 获取链接对应的配置，然后调用插件
     * @param seneca seneca
     * @param config 配置
     * @param data   数据
     */
    preExecute(seneca: any, config: any, data: any): Promise<any>;
    /**
     * 执行插件列表
     * @param seneca  seneca
     * @param plugins 插件配置
     * @param data    数据
     */
    execute(seneca: any, plugins: Array<any>, data?: any): Promise<any>;
    /**
     * 检测当前配置的模式是否存在，不存在则报错
     * @param seneca   seneca实例
     * @param plugins  插件列表
     */
    private checkParttens(seneca, plugins);
    /**
     * 找到当前queueItem对应的规则配置
     * @param queueItem 链接的数据
     * @param pages     定义的page
     */
    private getFieldFlow(queueItem, pages);
}
