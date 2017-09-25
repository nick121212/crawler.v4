export declare class TaskPlugin {
    /**
     * 当前正在执行的task列表
     */
    private mqs;
    /**
     * 执行插件列表的服务
     */
    private pluginService;
    /**
     * 获取queue的名称
     * @param config.key 主键
     */
    private getUrlQueueName(config);
    /**
     * 判断是否有queueService
     * @param queueName queue名称
     */
    private has(queueName);
    /**
     * 获取一个queueService实例
     * @param config  参数
     */
    private getQueueService(config);
    /**
     * 数据入到Queue
     * @param config 数据
     */
    private addToQueue(config);
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
    private removeFromTask({key, purge}, options, globalOptions);
    /**
     * 列出所有
     * @param param0
     * @param options
     * @param globalOptions
     */
    private listTask({config}, options, globalOptions);
    /**
     * 获取queue的消费信息
     * @param key      queue的key
     * @param options  参数
     */
    private getQueue(key, options);
    /**
     * 启动未正常停止的队列
     * @param msg
     * @param options
     * @param globalOptions
     */
    private init(msg, options, globalOptions);
}
