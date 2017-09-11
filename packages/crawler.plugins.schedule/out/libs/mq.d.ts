/**
 * agenda服务
 */
export declare class MQueueService {
    queueName: string;
    private connection;
    private channel;
    private consume;
    private exchange;
    /**
     * 构造函数
     */
    constructor();
    /**
     * 初始化消费队列
     */
    initConsume(rabbitmqConfig: {
        url: string;
        options: any;
    }, queueName: string, consumeMsg: Function, prefetch?: number): Promise<boolean>;
    addItemsToQueue(items: Array<any>, routingKey?: string): void;
    /**
     * 销毁队列
     */
    destroy(): Promise<void>;
    /**
    * 初始化队列
    */
    private initQueue(rabbitmqConfig);
}
