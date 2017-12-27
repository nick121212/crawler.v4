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
var constants_1 = require("../constants");
var kue_1 = require("../libs/kue");
var KuePlugin = /** @class */ (function () {
    function KuePlugin() {
    }
    /**
     * 启动一个任务
     * @param param0 数据
     */
    KuePlugin.prototype.create = function (config, options, globalOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var type, data, removeOnComplete, every, priority, attempts, backoff, unique, ttl, progress, job, saveAsync;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type = config.type, data = config.data, removeOnComplete = config.removeOnComplete, every = config.every, priority = config.priority, attempts = config.attempts, backoff = config.backoff, unique = config.unique, ttl = config.ttl, progress = config.progress;
                        job = this.kue.queue.createJob(type || "seneca-schedule", data)
                            .removeOnComplete(removeOnComplete);
                        saveAsync = bluebird.promisify(job.save.bind(job));
                        if (unique) {
                            job.unique(unique);
                        }
                        if (priority) {
                            job.priority(priority);
                        }
                        if (attempts) {
                            job.attempts(attempts);
                        }
                        if (backoff) {
                            job.backoff(backoff);
                        }
                        if (ttl) {
                            job.ttl(ttl);
                        }
                        return [4 /*yield*/, saveAsync()];
                    case 1:
                        _a.sent();
                        if (every) {
                            this.kue.queue.every(every, job);
                        }
                        return [2 /*return*/, job];
                }
            });
        });
    };
    /**
    * 启动一个任务
    * @param param0 数据
    */
    KuePlugin.prototype.remove = function (config, options, globalOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var unique;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unique = config.unique;
                        return [4 /*yield*/, this.kue.remove(unique)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, null];
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
    KuePlugin.prototype.init = function (msg, options, globalOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.kue = new kue_1.KueService(globalOptions);
                this.kue.queue.on('job enqueue', function (id, type) {
                    console.log('Job %s got queued of type %s', id, type);
                }).on('job complete', function (id, result) {
                    console.log("job completed ", id, result);
                });
                this.kue.queue.process("seneca-schedule", function (job, done) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        options.seneca.actAsync(job.data.partten, job.data.data);
                        done();
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        crawler_plugins_common_1.Add("role:" + constants_1.pluginName + ",cmd:create"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", Promise)
    ], KuePlugin.prototype, "create", null);
    __decorate([
        crawler_plugins_common_1.Add("role:" + constants_1.pluginName + ",cmd:remove"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", Promise)
    ], KuePlugin.prototype, "remove", null);
    __decorate([
        crawler_plugins_common_1.Init(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", Promise)
    ], KuePlugin.prototype, "init", null);
    KuePlugin = __decorate([
        crawler_plugins_common_1.Plugin(constants_1.pluginName),
        inversify_1.injectable()
    ], KuePlugin);
    return KuePlugin;
}());
exports.KuePlugin = KuePlugin;
//# sourceMappingURL=kue.js.map