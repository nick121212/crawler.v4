/// <reference types="seneca" />
import * as seneca from 'seneca';
/**
 * agenda服务
 */
export declare class MQueueService {
    private connection;
    private channel;
    private consume;
    private exchange;
    private queueName;
    private seneca;
    config: any;
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
    initConsume(seneca: seneca.Instance, rabbitmqConfig: {
        url: string;
        options: any;
    }, queueName: string, config: any, prefetch?: number): Promise<boolean>;
    /**
     * 发送socket消息
     * @param msg    一条queue的消息
     */
    private execute(msg);
    /**
     * 销毁队列
     */
    destroy(): Promise<void>;
}
