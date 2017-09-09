import { MQueueService } from '../libs/mq';
export declare class TaskPlugin {
    /**
     * 当前正在执行的task列表
     */
    private mqs;
    /**
     * 执行插件列表的服务
     */
    private pluginService;
    getUrlQueueName(config: {
        key: string;
    }): string;
    has(queueName: string): boolean;
    getQueueService(config: any): MQueueService | null;
    /**
     * 启动一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    addToTask(config: {
        key: string;
        msgPlugins: Array<any>;
        initPlugins: Array<any>;
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
     * 删除一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    listTask({config}: {
        config: any;
    }, options: any, globalOptions: any): Promise<any>;
    /**
     * 启动未正常停止的队列
     * @param msg
     * @param options
     * @param globalOptions
     */
    init(msg: any, options: any, globalOptions: any): Promise<void>;
}
