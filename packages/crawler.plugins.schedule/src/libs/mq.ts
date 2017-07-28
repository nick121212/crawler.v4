import * as amqplib from 'amqplib';
import * as bluebird from 'bluebird';
import * as _ from 'lodash';
import { injectable } from "inversify";

process.on('unhandledRejection', (reason, p) => {
    console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});

/**
 * agenda服务
 */
@injectable()
export class MQueueService {
    private connection: amqplib.Connection;
    private channel: amqplib.Channel;
    private consume: amqplib.Replies.Consume;
    private exchange: amqplib.Replies.AssertExchange;
    private queueName: string;
    public config: any;

    /**
     * 构造函数
     */
    constructor() {
        return this;
    }
    /**
     * 初始化队列
     */
    private async initQueue(rabbitmqConfig: { url: string, options: any }): Promise<void> {
        this.connection = await amqplib.connect(rabbitmqConfig.url, rabbitmqConfig.options);
        this.channel = await this.connection.createConfirmChannel();

        this.channel.on("error", (err) => {
            console.log("channel error", err);
        });
        this.channel.on("close", () => {
            console.log("channel closed!");
        });
    }

    /**
     * 初始化消费队列
     */
    async initConsume(rabbitmqConfig: { url: string, options: any }, queueName: string, config: any, prefetch: number = 1): Promise<void> {
        let count = 0, exchange: amqplib.Replies.AssertExchange, queue: amqplib.Replies.AssertQueue;
        await this.initQueue(rabbitmqConfig);

        this.queueName = queueName;
        this.config = config;
        exchange = await this.channel.assertExchange("amqp.topic", "topic", { durable: true });
        queue = await this.channel.assertQueue(queueName, { durable: true, exclusive: false });

        this.exchange = exchange;
        await this.channel.bindQueue(queue.queue, exchange.exchange, `crawler.url.${config.key}`);

        try {
            await this.channel.prefetch(prefetch);
            // await this.initInitilizeUrls(this.config.initUrls);

            console.log(`开始消费queue:${this.config.key}`);

            this.consume = await this.channel.consume(queue.queue, (msg: amqplib.Message) => {
                this.execute(msg).then(async (data: any) => {
                    console.log(data);
                    await bluebird.delay(3000);
                    this.channel && this.channel.nack(msg);
                }).catch(async (err) => {
                    await bluebird.delay(3000);
                    this.channel && this.channel.nack(msg);
                });
            }, { noAck: false, exclusive: false });
            console.info(queue.consumerCount, queue.messageCount);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * 发送socket消息
     * @param msg    一条queue的消息
     */
    private async execute(msg: amqplib.Message) {
        // 返回promise，超时时间为60秒
        // return new bluebird(async (resolve, reject) => {
        //     try {
        //         let data = await this.socketService.emitCrawlerNodeExecute(Object.assign({},
        //             this.config, {
        //                 queueItem: JSON.parse(msg.content.toString())
        //             }));

        //         await this.save(data);
        //         resolve(data);
        //     }
        //     catch (e) {
        //         reject(e);
        //     }
        // }).timeout(10000);

        return { a: 1 };
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
            delete this.config;
            delete this.exchange;

            console.log("queue stoped!");

        } catch (e) {
            console.log(e);
        }
    }
}