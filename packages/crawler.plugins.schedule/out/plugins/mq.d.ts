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
    addToQueue(config: any, options?: any, globalOptions?: any): Promise<void>;
    init(msg: any, options: any, globalOptions: any): Promise<void>;
}
