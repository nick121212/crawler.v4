export declare class TaskPlugin {
    /**
     * 当前正在执行的task列表
     */
    private mqs;
    /**
     * 执行插件列表的服务
     */
    private pluginService;
    private getUrlQueueName(config);
    private has(queueName);
    /**
     * 获取一个queueService实例
     * @param config  参数
     */
    private getQueueService(config);
    private addToQueue(config, options?, globalOptions?);
    /**
     * 启动一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    private addToTask(config, options?, globalOptions?);
    /**
     * 删除一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    private removeFromTask({config, purge}, options, globalOptions);
    /**
     * 删除一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    private listTask({config}, options, globalOptions);
    /**
     * 启动未正常停止的队列
     * @param msg
     * @param options
     * @param globalOptions
     */
    private init(msg, options, globalOptions);
}
