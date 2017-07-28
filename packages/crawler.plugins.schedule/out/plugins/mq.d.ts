export declare class MQueuePlugin {
    private mqs;
    has(key: string): boolean;
    /**
     * 启动一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    addToQueue({config}: {
        config: any;
    }, options: any, globalOptions: any): Promise<void>;
    removeFromQueue({config}: {
        config: any;
    }, options: any, globalOptions: any): Promise<void>;
    init(msg: any, options: any, globalOptions: any): Promise<void>;
}
