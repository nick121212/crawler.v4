export declare class TaskPlugin {
    /**
     * 当前正在执行的task列表
     */
    private mqs;
    has(key: string): boolean;
    /**
     * 启动一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    addToTask({config}: {
        config: any;
    }, options?: any, globalOptions?: any): Promise<void>;
    /**
     * 删除一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    removeFromTask({config}: {
        config: any;
    }, options: any, globalOptions: any): Promise<void>;
    /**
     * 启动未正常停止的队列
     * @param msg
     * @param options
     * @param globalOptions
     */
    init(msg: any, options: any, globalOptions: any): Promise<void>;
}
