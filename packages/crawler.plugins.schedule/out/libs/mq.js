"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var amqplib = require("amqplib");
var bluebird = require("bluebird");
var inversify_1 = require("inversify");
/**
 * rabbitmq服务
 */
var MQueueService = (function () {
    function MQueueService() {
    }
    /**
     * 初始化消费队列
     * 1. 初始化queue
     * 2. 创建exchange
     * 3. 创建queue
     * 4. 绑定queue的路由
     * 5. 开始消费
     * @param rabbitmqConfig mq的配置
     * @param queueName      mq要消费的q名称
     * @param consumeMsg     消息的消费方法
     * @param prefetch       每次获取的消息数量
     * @param delay          延迟时间
     */
    MQueueService.prototype.initConsume = function (rabbitmqConfig, queueName, consumeMsg, config) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var count, queue, _a, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        count = 0;
                        this.queueName = queueName;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, this.initQueue(rabbitmqConfig)];
                    case 2:
                        _c.sent();
                        _a = this;
                        return [4 /*yield*/, this.channel.assertExchange("amqp.topic", "topic", { durable: true })];
                    case 3:
                        _a.exchange = _c.sent();
                        return [4 /*yield*/, this.getQueueMessageCount(this.queueName)];
                    case 4:
                        queue = _c.sent();
                        return [4 /*yield*/, this.channel.bindQueue(queue.queue, this.exchange.exchange, queueName)];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, this.channel.prefetch(config.prefech || 3)];
                    case 6:
                        _c.sent();
                        console.log("\u5F00\u59CB\u6D88\u8D39queue:" + queue.queue);
                        // 1. 序列化queue的消息
                        // 2. 调用消费方法
                        _b = this;
                        return [4 /*yield*/, this.channel.consume(queue.queue, function (msg) { return __awaiter(_this, void 0, void 0, function () {
                                var msgData, e_2, data, err_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, this.getQueueItemFromMsg(msg)];
                                        case 1:
                                            msgData = _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            e_2 = _a.sent();
                                            if (this.channel) {
                                                this.channel.nack(msg);
                                            }
                                            return [2 /*return*/];
                                        case 3: return [4 /*yield*/, bluebird.delay(config.delay || 1000)];
                                        case 4:
                                            _a.sent();
                                            _a.label = 5;
                                        case 5:
                                            _a.trys.push([5, 7, , 8]);
                                            return [4 /*yield*/, consumeMsg({ config: config, data: msgData })];
                                        case 6:
                                            data = _a.sent();
                                            console.log("爬取成功！");
                                            if (this.channel) {
                                                this.channel.ack(msg);
                                            }
                                            return [3 /*break*/, 8];
                                        case 7:
                                            err_1 = _a.sent();
                                            console.log("爬取失败！", err_1.message);
                                            if (this.channel) {
                                                this.channel.nack(msg);
                                            }
                                            return [3 /*break*/, 8];
                                        case 8: return [2 /*return*/];
                                    }
                                });
                            }); }, { noAck: false, exclusive: false })];
                    case 7:
                        // 1. 序列化queue的消息
                        // 2. 调用消费方法
                        _b.consume = _c.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        e_1 = _c.sent();
                        console.log(e_1.message);
                        return [2 /*return*/, false];
                    case 9: return [2 /*return*/, queue.consumerCount + queue.messageCount === 0];
                }
            });
        });
    };
    /**
     *
     * @param qName 获得queue的消费数量
     */
    MQueueService.prototype.getQueueMessageCount = function (qName) {
        return __awaiter(this, void 0, void 0, function () {
            var queue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.channel) {
                            throw new Error("没有建立channel！");
                        }
                        return [4 /*yield*/, this.channel.assertQueue(qName, { durable: true, exclusive: false })];
                    case 1:
                        queue = _a.sent();
                        return [2 /*return*/, queue];
                }
            });
        });
    };
    /**
     * 数据入queue
     * @param items       要入queue的消息
     * @param routingKey  路由key
     */
    MQueueService.prototype.addItemsToQueue = function (items, routingKey) {
        var _this = this;
        var rtn = true;
        if (!this.channel) {
            throw new Error("没有建立channel连接！");
        }
        items.forEach(function (item) {
            var push = _this.channel.publish(_this.exchange.exchange, routingKey || _this.queueName, new Buffer(JSON.stringify(item)), {});
            rtn = rtn && push;
        });
        return rtn;
    };
    /**
     * 销毁队列
     * @param purge 是否清楚数据
     */
    MQueueService.prototype.destroy = function (purge) {
        if (purge === void 0) { purge = false; }
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.channel.nackAll(true)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.channel.cancel(this.consume.consumerTag)];
                    case 2:
                        _a.sent();
                        if (!purge) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.channel.deleteQueue(this.queueName)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.channel.close()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.connection.close()];
                    case 6:
                        _a.sent();
                        delete this.channel;
                        delete this.connection;
                        delete this.consume;
                        delete this.exchange;
                        console.log("queue stoped!");
                        return [3 /*break*/, 8];
                    case 7:
                        e_3 = _a.sent();
                        console.log(e_3);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 初始化队列
     * @param rabbitmqConfig mq的配置
     */
    MQueueService.prototype.initQueue = function (rabbitmqConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.channel) {
                            return [2 /*return*/];
                        }
                        _a = this;
                        return [4 /*yield*/, amqplib.connect(rabbitmqConfig.url, rabbitmqConfig.options)];
                    case 1:
                        _a.connection = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.connection.createConfirmChannel()];
                    case 2:
                        _b.channel = _c.sent();
                        this.channel.on("error", function (err) {
                            console.log("channel error", err);
                        });
                        this.channel.on("close", function () {
                            console.log("channel closed!");
                        });
                        console.log("mq connection ok!");
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 提取queueItem
     * @param msg 消息体
     */
    MQueueService.prototype.getQueueItemFromMsg = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var queueItem;
            return __generator(this, function (_a) {
                try {
                    queueItem = JSON.parse(msg.content.toString());
                }
                catch (e) {
                    console.log(e);
                    throw e;
                }
                return [2 /*return*/, queueItem];
            });
        });
    };
    return MQueueService;
}());
MQueueService = __decorate([
    inversify_1.injectable()
], MQueueService);
exports.MQueueService = MQueueService;
//# sourceMappingURL=mq.js.map