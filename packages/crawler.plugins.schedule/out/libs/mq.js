"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
process.on('unhandledRejection', function (reason, p) {
    console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});
/**
 * agenda服务
 */
var MQueueService = (function () {
    // public config: any;
    /**
     * 构造函数
     */
    function MQueueService() {
        return this;
    }
    /**
     * 初始化队列
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
     * 初始化消费队列
     */
    MQueueService.prototype.initConsume = function (rabbitmqConfig, queueName, consumeMsg, prefetch) {
        if (prefetch === void 0) { prefetch = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var count, exchange, queue, e_1, _a, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        count = 0;
                        this.queueName = queueName;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.initQueue(rabbitmqConfig)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.channel.assertExchange("amqp.topic", "topic", { durable: true })];
                    case 3:
                        exchange = _b.sent();
                        return [4 /*yield*/, this.channel.assertQueue(queueName, { durable: true, exclusive: false })];
                    case 4:
                        queue = _b.sent();
                        this.exchange = exchange;
                        return [4 /*yield*/, this.channel.bindQueue(queue.queue, exchange.exchange, queueName)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _b.sent();
                        console.log(e_1.message);
                        return [2 /*return*/, false];
                    case 7:
                        _b.trys.push([7, 10, , 11]);
                        return [4 /*yield*/, this.channel.prefetch(prefetch)];
                    case 8:
                        _b.sent();
                        console.log("\u5F00\u59CB\u6D88\u8D39queue:" + queue.queue);
                        _a = this;
                        return [4 /*yield*/, this.channel.consume(queue.queue, function (msg) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, bluebird.delay(3000)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, consumeMsg(msg).then(function (data) {
                                                    // console.log(data);
                                                    _this.channel && _this.channel.nack(msg);
                                                }).catch(function (err) {
                                                    console.log(err);
                                                    _this.channel && _this.channel.nack(msg);
                                                })];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, { noAck: false, exclusive: false })];
                    case 9:
                        _a.consume = _b.sent();
                        console.info(queue.consumerCount, queue.messageCount);
                        return [3 /*break*/, 11];
                    case 10:
                        e_2 = _b.sent();
                        console.log(e_2.message);
                        return [2 /*return*/, false];
                    case 11: return [2 /*return*/, queue.consumerCount + queue.messageCount == 0];
                }
            });
        });
    };
    MQueueService.prototype.addItemsToQueue = function (items) {
        var _this = this;
        items.forEach(function (item) {
            _this.channel.publish(_this.exchange.exchange, _this.queueName, new Buffer(JSON.stringify(item)), {});
        });
    };
    /**
     * 销毁队列
     */
    MQueueService.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.channel.nackAll(true)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.channel.cancel(this.consume.consumerTag)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.channel.close()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.connection.close()];
                    case 4:
                        _a.sent();
                        delete this.channel;
                        delete this.connection;
                        delete this.consume;
                        // delete this.config;
                        delete this.exchange;
                        console.log("queue stoped!");
                        return [3 /*break*/, 6];
                    case 5:
                        e_3 = _a.sent();
                        console.log(e_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return MQueueService;
}());
MQueueService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], MQueueService);
exports.MQueueService = MQueueService;
//# sourceMappingURL=mq.js.map