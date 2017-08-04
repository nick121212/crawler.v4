import * as seneca from 'seneca';
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
    private seneca: any;
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
        console.log("mq connection ok!");
    }

    /**
     * 初始化消费队列
     */
    async initConsume(seneca: seneca.Instance, rabbitmqConfig: { url: string, options: any }, queueName: string, config: any, prefetch: number = 1): Promise<boolean> {
        let count = 0, exchange: amqplib.Replies.AssertExchange, queue: amqplib.Replies.AssertQueue;

        this.queueName = queueName;
        this.config = config;
        this.seneca = seneca;

        try {
            await this.initQueue(rabbitmqConfig);
            exchange = await this.channel.assertExchange("amqp.topic", "topic", { durable: true });
            queue = await this.channel.assertQueue(queueName, { durable: true, exclusive: false });

            this.exchange = exchange;
            await this.channel.bindQueue(queue.queue, exchange.exchange, `crawler.url.${config.key}`);
        }
        catch (e) {
            console.log(e.message);
            return false;
        }
        try {
            await this.channel.prefetch(prefetch);
            // await this.initInitilizeUrls(this.config.initUrls);
            console.log(`开始消费queue:${this.config.key}`);
            this.consume = await this.channel.consume(queue.queue, async (msg: amqplib.Message) => {
                await bluebird.delay(3000);

                this.execute(msg).then(async (data: any) => {
                    console.log(data);
                    this.channel && this.channel.nack(msg);
                }).catch(async (err) => {
                    this.channel && this.channel.nack(msg);
                });
            }, { noAck: false, exclusive: false });
            console.info(queue.consumerCount, queue.messageCount);
        } catch (e) {
            console.log(e.message);

            return false;
        }

        return true;
    }

    /**
     * 发送socket消息
     * @param msg    一条queue的消息
     */
    private async execute(msg: amqplib.Message) {
        let queueItem = JSON.parse(msg.content.toString());
        let datas: Array<any> = [];
        let { plugins = [] } = this.config;

        plugins.forEach(async (plugin: { partten: string, data: any }) => {
            if (this.seneca.has(plugin.partten)) {
                datas.push(this.seneca.actAsync(plugin.partten, plugin.data));
            }else{
                console.log(`没有发现partten: ${plugin.partten}`);
            }
        });

        return await Promise.all(datas);
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