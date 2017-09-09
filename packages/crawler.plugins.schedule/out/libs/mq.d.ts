/**
 * agenda服务
 */
export declare class MQueueService {
    private connection;
    private channel;
    private consume;
    private exchange;
    queueName: string;
    /**
     * 构造函数
     */
    constructor();
    /**
     * 初始化队列
     */
    private initQueue(rabbitmqConfig);
    /**
     * 初始化消费队列
     */
    initConsume(rabbitmqConfig: {
        url: string;
        options: any;
    }, queueName: string, consumeMsg: Function, prefetch?: number): Promise<boolean>;
    addItemsToQueue(items: Array<any>): void;
    /**
     * 销毁队列
     */
    destroy(): Promise<void>;
}
