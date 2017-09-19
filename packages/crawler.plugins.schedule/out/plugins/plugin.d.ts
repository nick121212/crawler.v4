export declare class PluginPlugin {
    /**
     * 执行插件列表的服务
     */
    private pluginService;
    /**
    * 找到当前queueItem对应的规则配置
    * @param queueItem 链接的数据
    * @param pages     定义的page
    */
    private getFieldFlow({queueItem, pages});
    /**
     * 测试一个流
     * @param config        流配置
     * @param options       seneca的options
     * @param globalOptions 全局options
     */
    private testFlow(config, options?, globalOptions?);
}
