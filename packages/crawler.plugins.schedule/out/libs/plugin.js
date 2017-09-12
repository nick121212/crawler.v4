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
var _ = require("lodash");
var inversify_1 = require("inversify");
var pathToRegexp = require("path-to-regexp");
var ExecutePluginService = (function () {
    function ExecutePluginService() {
    }
    ExecutePluginService.prototype.preExecute = function (seneca, config, msg) {
        return __awaiter(this, void 0, void 0, function () {
            var queueItem, msgFlow;
            return __generator(this, function (_a) {
                queueItem = msg ? this.getQueueItemFromMsg(msg) : null;
                msgFlow = this.getFieldFlow(queueItem || {}, config.pages || []);
                if (!msgFlow || !msg) {
                    return [2 /*return*/];
                }
                return [2 /*return*/, this.execute(seneca, msgFlow, msg)];
            });
        });
    };
    /**
     * 执行插件列表
     * @param seneca
     * @param plugins
     * @param msg
     */
    ExecutePluginService.prototype.execute = function (seneca, plugins, msg) {
        return __awaiter(this, void 0, void 0, function () {
            var rtn, index, nn, _loop_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rtn = {
                            queueItem: msg ? this.getQueueItemFromMsg(msg) : null
                        }, index = 0;
                        nn = Date.now();
                        if (rtn.queueItem) {
                            console.log("\u5F00\u59CB\u8C03\u7528" + rtn.queueItem.url);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        // 验证partten的合法性
                        this.checkParttens(seneca, plugins);
                        _loop_1 = function () {
                            var plugin, jsonata, start, ddd, ccc, ddd;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        plugin = plugins[index];
                                        jsonata = {};
                                        start = Date.now();
                                        if (!plugin.jsonata) return [3 /*break*/, 2];
                                        return [4 /*yield*/, seneca.actAsync("role:crawler.plugin.transform,cmd:muti", {
                                                data: rtn,
                                                expressions: plugin.jsonata
                                            })];
                                    case 1:
                                        ddd = _a.sent();
                                        ddd.result.forEach(function (r) {
                                            jsonata = Object.assign({}, jsonata, r || {});
                                        });
                                        _a.label = 2;
                                    case 2: return [4 /*yield*/, seneca.actAsync(plugin.partten, Object.assign({}, jsonata, plugin.data))];
                                    case 3:
                                        ccc = _a.sent();
                                        console.log("\u8C03\u7528" + plugin.partten + "\u6210\u529F\uFF01\u8017\u65F6\uFF1A", Date.now() - start, "ms");
                                        if (!plugin.result) return [3 /*break*/, 5];
                                        return [4 /*yield*/, seneca.actAsync("role:crawler.plugin.transform,cmd:single", {
                                                data: ccc,
                                                expression: plugin.result
                                            })];
                                    case 4:
                                        ddd = _a.sent();
                                        rtn = seneca.util.deepextend({}, rtn, ddd.result || {});
                                        _a.label = 5;
                                    case 5:
                                        index++;
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _a.label = 2;
                    case 2:
                        if (!(index < plugins.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        throw e_1;
                    case 6:
                        if (rtn.queueItem) {
                            seneca.log.info("\u8C03\u7528" + rtn.queueItem.url + "\u7528\u65F6" + (Date.now() - nn));
                        }
                        return [2 /*return*/, rtn];
                }
            });
        });
    };
    /**
     * 检测当前配置的模式是否存在，不存在则报错
     * @param seneca   seneca实例
     * @param plugins  插件列表
     */
    ExecutePluginService.prototype.checkParttens = function (seneca, plugins) {
        _.each(plugins, function (plugin) {
            if (!seneca.has(plugin.partten)) {
                console.log("\u6CA1\u6709\u53D1\u73B0partten: " + plugin.partten);
                return new Error("\u6CA1\u6709\u627E\u5230partten:" + plugin.partten);
            }
        });
        return true;
    };
    /**
    * 从message中提取queueItem数据
    * @param msg   消息
    */
    ExecutePluginService.prototype.getQueueItemFromMsg = function (msg) {
        var queueItem;
        try {
            queueItem = JSON.parse(msg.content.toString());
        }
        catch (e) {
            console.log(e);
            throw e;
        }
        return queueItem;
    };
    ExecutePluginService.prototype.getFieldFlow = function (queueItem, pages) {
        var rules = _.filter(pages, function (_a) {
            var path = _a.path;
            var pathToReg = pathToRegexp(path.toString(), []);
            return pathToReg.test(queueItem.path || "");
        });
        if (!rules.length) {
            console.error("\u6CA1\u6709\u627E\u5230" + queueItem.url + "\u7684\u5339\u914D\u89C4\u5219\uFF01");
            return null;
        }
        // console.log(_.first(rules).title || "");
        return _.first(rules).msgFlow || [];
    };
    return ExecutePluginService;
}());
ExecutePluginService = __decorate([
    inversify_1.injectable()
], ExecutePluginService);
exports.ExecutePluginService = ExecutePluginService;
;
//# sourceMappingURL=plugin.js.map