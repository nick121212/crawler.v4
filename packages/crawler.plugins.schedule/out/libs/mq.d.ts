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
     * @param rabbitmqConfig mq的配置
     * @param queueName      mq要消费的q名称
     * @param consumeMsg     消息的消费方法
     * @param prefetch       每次获取的消息数量
     * @param delay          延迟时间
     */
    initConsume(rabbitmqConfig: {
        url: string;
        options: any;
    }, queueName: string, consumeMsg: Function, prefetch?: number, delay?: number): Promise<boolean>;
    addItemsToQueue(items: Array<any>, routingKey?: string): void;
    /**
     * 销毁队列
     */
    destroy(): Promise<void>;
    /**
    * 初始化队列
    */
    private initQueue(rabbitmqConfig);
    /**
     * 提取queueItem
     * @param msg 消息体
     */
    private getQueueItemFromMsg(msg);
}
