export declare class MQueuePlugin {
    /**
     * 注入一个mq服务
     */
    private mqService;
    /**
     * 启动一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    private addToQueue(config, options?, globalOptions?);
    private init(msg, options, globalOptions);
}
