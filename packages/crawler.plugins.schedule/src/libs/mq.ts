import * as seneca from "seneca";
import * as amqplib from "amqplib";
import * as bluebird from "bluebird";
import * as _ from "lodash";
import { injectable } from "inversify";

process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});

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
     */
    public async initConsume(
        rabbitmqConfig: { url: string, options: any },
        queueName: string,
        consumeMsg: Function,
        prefetch = 1
    ): Promise<boolean> {
        let count = 0, exchange: amqplib.Replies.AssertExchange, queue: amqplib.Replies.AssertQueue;

        this.queueName = queueName;
        // this.config = config;

        try {
            await this.initQueue(rabbitmqConfig);
            exchange = await this.channel.assertExchange("amqp.topic", "topic", { durable: true });
            queue = await this.channel.assertQueue(queueName, { durable: true, exclusive: false });

            this.exchange = exchange;
            await this.channel.bindQueue(queue.queue, exchange.exchange, queueName);

            await this.channel.prefetch(prefetch);
            console.log(`开始消费queue:${queue.queue}`);
            this.consume = await this.channel.consume(queue.queue, async (msg: amqplib.Message) => {
                await bluebird.delay(3000);
                await consumeMsg(msg).then((data: any) => {
                    if (this.channel) {
                        this.channel.ack(msg);
                    }
                }).catch((err: Error) => {
                    console.log("爬取失败！", err.message);
                    if (this.channel) {
                        this.channel.nack(msg);
                    }
                });
            }, { noAck: false, exclusive: false });

            console.log(queue.consumerCount, queue.messageCount);
        } catch (e) {
            console.log(e.message);

            return false;
        }

        return queue.consumerCount + queue.messageCount === 0;
    }

    public addItemsToQueue(items: Array<any>, routingKey?: string) {
        items.forEach((item) => {
            this.channel.publish(this.exchange.exchange, routingKey || this.queueName, new Buffer(JSON.stringify(item)), {});
        });
    }

    /**
     * 销毁队列
     */
    public async destroy(): Promise<void> {
        try {
            await this.channel.nackAll(true);
            await this.channel.cancel(this.consume.consumerTag);
            await this.channel.close();
            await this.connection.close();

            delete this.channel;
            delete this.connection;
            delete this.consume;
            // delete this.config;
            delete this.exchange;

            console.log("queue stoped!");

        } catch (e) {
            console.log(e);
        }
    }

    /**
    * 初始化队列
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
}
