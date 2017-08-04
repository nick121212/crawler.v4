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
var inversify_1 = require("inversify");
var crawler_plugins_common_1 = require("crawler.plugins.common");
var bluebird = require("bluebird");
var _ = require("lodash");
var constants_1 = require("../constants");
var mq_1 = require("../libs/mq");
var TaskPlugin = (function () {
    function TaskPlugin() {
        /**
         * 当前正在执行的task列表
         */
        this.mqs = [];
    }
    TaskPlugin.prototype.has = function (key) {
        var mQueueServie = _.first(_.filter(this.mqs, function (mq) {
            return mq.config && mq.config.key === key;
        }));
        return !!mQueueServie;
    };
    /**
     * 启动一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    TaskPlugin.prototype.addToTask = function (_a, options, globalOptions) {
        var config = _a.config, plugins = _a.plugins;
        return __awaiter(this, void 0, void 0, function () {
            var mQueueService, task, instance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.has(config.key)) {
                            return [2 /*return*/];
                        }
                        mQueueService = new mq_1.MQueueService();
                        task = options.seneca.make$('tasks', {
                            id: config.key,
                            plugins: plugins,
                            config: config
                        });
                        return [4 /*yield*/, task.saveAsync()];
                    case 1:
                        instance = _a.sent();
                        this.mqs.push(mQueueService);
                        mQueueService.initConsume(options.seneca, globalOptions, config.key, {
                            config: config,
                            plugins: plugins
                        }, 5);
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
        var _b = _a.config, config = _b === void 0 ? {} : _b;
        return __awaiter(this, void 0, void 0, function () {
            var mQueueServie, entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mQueueServie = _.first(_.filter(this.mqs, function (mq) {
                            return mq.config.key === config.key;
                        }));
                        if (!mQueueServie) {
                            return [2 /*return*/];
                        }
                        entity = options.seneca.make$('tasks');
                        return [4 /*yield*/, entity.removeAsync({ id: config.key })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, mQueueServie.destroy()];
                    case 2:
                        _a.sent();
                        _.remove(this.mqs, mQueueServie);
                        return [2 /*return*/];
                }
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
            var entity, tasks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entity = options.seneca.make$('tasks');
                        return [4 /*yield*/, entity.listAsync({})];
                    case 1:
                        tasks = _a.sent();
                        // _.forEach(tasks, async (task: any) => {
                        //     if (task.id && !this.mqs[task.id]) {
                        //         await this.addToTask({ config: task.config, plugins: task.plugins }, options, globalOptions);
                        //     }
                        // });
                        return [4 /*yield*/, bluebird.delay(200)];
                    case 2:
                        // _.forEach(tasks, async (task: any) => {
                        //     if (task.id && !this.mqs[task.id]) {
                        //         await this.addToTask({ config: task.config, plugins: task.plugins }, options, globalOptions);
                        //     }
                        // });
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TaskPlugin;
}());
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