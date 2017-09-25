"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var inversify_1 = require("inversify");
var crawler_plugins_common_1 = require("crawler.plugins.common");
var bluebird = require("bluebird");
var _ = require("lodash");
var constants_1 = require("../constants");
var mq_1 = require("../libs/mq");
var plugin_1 = require("../libs/plugin");
var TaskPlugin = (function () {
    function TaskPlugin() {
        /**
         * 当前正在执行的task列表
         */
        this.mqs = [];
    }
    /**
     * 获取queue的名称
     * @param config.key 主键
     */
    TaskPlugin.prototype.getUrlQueueName = function (config) {
        return "crawler.url." + config.key;
    };
    /**
     * 判断是否有queueService
     * @param queueName queue名称
     */
    TaskPlugin.prototype.has = function (queueName) {
        var mQueueServie = _.first(_.filter(this.mqs, function (mq) {
            return mq.queueName === queueName;
        }));
        return !!mQueueServie;
    };
    /**
     * 获取一个queueService实例
     * @param config  参数
     */
    TaskPlugin.prototype.getQueueService = function (config) {
        var queueName = this.getUrlQueueName(config);
        if (this.has(queueName)) {
            var mQueueServie = _.first(_.filter(this.mqs, function (mq) {
                return mq.queueName === queueName;
            }));
            return mQueueServie;
        }
        return null;
    };
    /**
     * 数据入到Queue
     * @param config 数据
     */
    TaskPlugin.prototype.addToQueue = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var mqService, res;
            return __generator(this, function (_a) {
                mqService = this.getQueueService(config);
                if (!mqService) {
                    throw new Error("没有激活的mqService！");
                }
                // console.log("----------------itmes:", config.items);
                if (config.items && config.items.length) {
                    res = mqService.addItemsToQueue(config.items, config.routingKey);
                    // console.log("addToQueue 结果 :", res);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * 启动一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    TaskPlugin.prototype.addToTask = function (config, options, globalOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var queueName, mQueueService, task, instance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queueName = this.getUrlQueueName(config);
                        // throw new Error("test");
                        // 如果已经存在，则忽略
                        if (this.has(queueName)) {
                            return [2 /*return*/];
                        }
                        mQueueService = new mq_1.MQueueService();
                        task = options.seneca.make$("tasks", __assign({ id: config.key }, config));
                        return [4 /*yield*/, task.saveAsync()];
                    case 1:
                        instance = _a.sent();
                        this.mqs.push(mQueueService);
                        // 开始消费queue
                        if (mQueueService.initConsume(globalOptions, queueName, options.seneca.actAsync.bind(options.seneca, config.startPartten), config)) {
                            // 如果queue里面没有消息，则调用initFlow队列
                            if (config.initFlow && config.initFlow.length) {
                                setTimeout(function () {
                                    _this.pluginService.executePlugins(options.seneca, config.initFlow, {}).catch(console.error);
                                }, 500);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    TaskPlugin.prototype.removeFromTask = function (_a, options, globalOptions) {
        var key = _a.key, purge = _a.purge;
        return __awaiter(this, void 0, void 0, function () {
            var mQueueServie, entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mQueueServie = this.getQueueService({ key: key });
                        if (!mQueueServie) {
                            console.log("没有找到service" + key);
                            return [2 /*return*/];
                        }
                        entity = options.seneca.make$("tasks");
                        return [4 /*yield*/, entity.removeAsync({ id: key })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, mQueueServie.destroy(purge)];
                    case 2:
                        _a.sent();
                        _.remove(this.mqs, mQueueServie);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 列出所有
     * @param param0
     * @param options
     * @param globalOptions
     */
    TaskPlugin.prototype.listTask = function (_a, options, globalOptions) {
        var _b = _a.config, config = _b === void 0 ? {} : _b;
        return __awaiter(this, void 0, void 0, function () {
            var entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entity = options.seneca.make$("tasks");
                        return [4 /*yield*/, entity.listAsync(config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 获取queue的消费信息
     * @param key      queue的key
     * @param options  参数
     */
    TaskPlugin.prototype.getQueue = function (_a, options) {
        var key = _a.key;
        return __awaiter(this, void 0, void 0, function () {
            var mQueueServie;
            return __generator(this, function (_a) {
                mQueueServie = this.getQueueService({ key: key });
                if (!mQueueServie) {
                    console.log("没有找到mqService" + key);
                    throw new Error("没有找到mqService");
                }
                return [2 /*return*/, mQueueServie.getQueueMessageCount(mQueueServie.queueName)];
            });
        });
    };
    TaskPlugin.prototype.forever = function (msg, options, globalOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var entity, tasks;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                entity = options.seneca.make$("tasks");
                                return [4 /*yield*/, entity.listAsync({})];
                            case 1:
                                tasks = _a.sent();
                                _.forEach(tasks, function (task) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!(task.id && !this.mqs[task.id])) return [3 /*break*/, 2];
                                                return [4 /*yield*/, this.addToTask(task, options, globalOptions).catch(console.log)];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2: return [2 /*return*/];
                                        }
                                    });
                                }); });
                                return [2 /*return*/];
                        }
                    });
                }); }, 60000);
                return [2 /*return*/];
            });
        });
    };
    /**
     * 启动未正常停止的队列
     * @param msg
     * @param options
     * @param globalOptions
     */
    TaskPlugin.prototype.init = function (msg, options, globalOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bluebird.delay(200)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TaskPlugin;
}());
__decorate([
    inversify_1.inject(plugin_1.ExecutePluginService),
    __metadata("design:type", plugin_1.ExecutePluginService)
], TaskPlugin.prototype, "pluginService", void 0);
__decorate([
    crawler_plugins_common_1.Add("role:" + constants_1.pluginTaskName + ",cmd:getOne"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", mq_1.MQueueService)
], TaskPlugin.prototype, "getQueueService", null);
__decorate([
    crawler_plugins_common_1.Add("role:" + constants_1.pluginTaskName + ",cmd:addItemToQueue"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskPlugin.prototype, "addToQueue", null);
__decorate([
    crawler_plugins_common_1.Add("role:" + constants_1.pluginTaskName + ",cmd:add"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TaskPlugin.prototype, "addToTask", null);
__decorate([
    crawler_plugins_common_1.Add("role:" + constants_1.pluginTaskName + ",cmd:remove"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TaskPlugin.prototype, "removeFromTask", null);
__decorate([
    crawler_plugins_common_1.Add("role:" + constants_1.pluginTaskName + ",cmd:list"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TaskPlugin.prototype, "listTask", null);
__decorate([
    crawler_plugins_common_1.Add("role:" + constants_1.pluginTaskName + ",cmd:queueInfo"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TaskPlugin.prototype, "getQueue", null);
__decorate([
    crawler_plugins_common_1.Add("role:" + constants_1.pluginTaskName + ",cmd:forever"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TaskPlugin.prototype, "forever", null);
__decorate([
    crawler_plugins_common_1.Init(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TaskPlugin.prototype, "init", null);
TaskPlugin = __decorate([
    crawler_plugins_common_1.Plugin(constants_1.pluginTaskName),
    inversify_1.injectable()
], TaskPlugin);
exports.TaskPlugin = TaskPlugin;
//# sourceMappingURL=task.js.map