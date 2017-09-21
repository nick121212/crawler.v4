import * as seneca from "seneca";
import * as amqplib from "amqplib";
import * as bluebird from "bluebird";
import * as _ from "lodash";
import { injectable } from "inversify";

/**
 * agenda服务
 */
@injectable()
export class MQueueService {
    public queueName: string;

    private connection: amqplib.Connection;
    private channel: amqplib.Channel;
    private consume: amqplib.Replies.Consume;
    private exchange: amqplib.Replies.AssertExchange;

    /**
     * 构造函数
     */
    constructor() {
        return this;
    }

    /**
     * 初始化消费队列
     * 1. 初始化queue
     * 2. 创建exchange
     * 3. 创建queue
     * 4. 绑定queue的路由
     * 5. 开始消费
     * 
     * @param rabbitmqConfig mq的配置
     * @param queueName      mq要消费的q名称
     * @param consumeMsg     消息的消费方法
     * @param prefetch       每次获取的消息数量
     * @param delay          延迟时间
     */
    public async initConsume(
        rabbitmqConfig: { url: string, options: any },
        queueName: string,
        consumeMsg: Function,
        prefetch = 1,
        delay = 1000
    ): Promise<boolean> {
        let count = 0, exchange: amqplib.Replies.AssertExchange, queue: amqplib.Replies.AssertQueue;

        this.queueName = queueName;

        try {
            await this.initQueue(rabbitmqConfig);
            exchange = await this.channel.assertExchange("amqp.topic", "topic", { durable: true });
            queue = await this.channel.assertQueue(queueName, { durable: true, exclusive: false });

            this.exchange = exchange;
            await this.channel.bindQueue(queue.queue, exchange.exchange, queueName);
            await this.channel.prefetch(prefetch);
            console.log(`开始消费queue:${queue.queue}`);

            // 1. 序列化queue的消息
            // 2. 调用消费方法
            this.consume = await this.channel.consume(queue.queue, async (msg: amqplib.Message) => {
                let msgData: any;

                // 如果queue的msg不能正常序列化，则丢弃掉当前消息
                try {
                    msgData = await this.getQueueItemFromMsg(msg);
                } catch (e) {
                    if (this.channel) {
                        this.channel.nack(msg);
                    }

                    return;
                }

                await bluebird.delay(delay || 1000);
                await consumeMsg(msgData).then((data: any) => {
                    console.log("爬取成功！");

                    if (this.channel) {
                        this.channel.nack(msg, false, true);
                    }
                }).catch((err: Error) => {
                    console.log("爬取失败！", err.message);
                    if (this.channel) {
                        this.channel.nack(msg, false, true);
                    }
                });
            }, { noAck: false, exclusive: false });
            // console.log(queue.consumerCount, queue.messageCount);
        } catch (e) {
            console.log(e.message);
            return false;
        }

        return queue.consumerCount + queue.messageCount === 0;
    }

    /**
     * 数据入queue
     * @param items       要入queue的消息
     * @param routingKey  路由key
     */
    public addItemsToQueue(items: Array<any>, routingKey?: string) {
        items.forEach((item) => {
            this.channel.publish(this.exchange.exchange, routingKey || this.queueName, new Buffer(JSON.stringify(item)), {});
        });
    }

    /**
     * 销毁队列
     * @param purge 是否清楚数据
     */
    public async destroy(purge = false): Promise<void> {
        try {
            await this.channel.nackAll(true);
            await this.channel.cancel(this.consume.consumerTag);
            if (purge) {
                await this.channel.deleteQueue(this.queueName);
            }
            await this.channel.close();
            await this.connection.close();

            delete this.channel;
            delete this.connection;
            delete this.consume;
            delete this.exchange;

            console.log("queue stoped!");
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * 初始化队列
     * @param rabbitmqConfig mq的配置
     */
    private async initQueue(rabbitmqConfig: { url: string, options: any }): Promise<void> {
        if (this.channel) {
            return;
        }

        this.connection = await amqplib.connect(rabbitmqConfig.url, rabbitmqConfig.options);
        this.channel = await this.connection.createConfirmChannel();

        this.channel.on("error", (err) => {
            console.log("channel error", err);
        });
        this.channel.on("close", () => {
            console.log("channel closed!");
        });
        console.log("mq connection ok!");
    }

    /**
     * 提取queueItem
     * @param msg 消息体
     */
    private async getQueueItemFromMsg(msg: amqplib.Message): Promise<any> {
        let queueItem;

        try {
            queueItem = JSON.parse(msg.content.toString());
        } catch (e) {
            console.log(e);
            throw e;
        }

        return queueItem;
    }
}
