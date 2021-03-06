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
var constants_1 = require("../constants");
var ExecutePluginService = /** @class */ (function () {
    function ExecutePluginService() {
    }
    /**
     * 获取链接对应的配置，然后调用插件
     * @param seneca seneca
     * @param config 配置
     * @param data   数据
     */
    ExecutePluginService.prototype.preExecute = function (seneca, config, data) {
        return __awaiter(this, void 0, void 0, function () {
            var msgFlow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, seneca.actAsync("role:" + constants_1.pluginResultName + ",cmd:getFieldFlow", __assign({ pages: config.pages }, data))];
                    case 1:
                        msgFlow = _a.sent();
                        if (!msgFlow) {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, this.executePlugins(seneca, msgFlow, data)];
                }
            });
        });
    };
    /**
     * 调用插件流
     * @param seneca  seneca
     * @param plugins 插件列表
     * @param data    数据
     */
    ExecutePluginService.prototype.executePlugins = function (seneca, plugins, data) {
        if (data === void 0) { data = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var len, currentIndex, currentPlugin, start, e_1, e_2, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        len = plugins.length, currentIndex = 0;
                        if (!data.__META__) {
                            data.__META__ = {
                                timer: [],
                                retry: {}
                            };
                        }
                        // 检测是否可以执行插件
                        return [4 /*yield*/, this.checkParttens(seneca, plugins)];
                    case 1:
                        // 检测是否可以执行插件
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(len > currentIndex)) return [3 /*break*/, 15];
                        currentPlugin = plugins[currentIndex++];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 9, , 14]);
                        start = Date.now();
                        return [4 /*yield*/, this.executePlugin(seneca, currentPlugin, data)];
                    case 4:
                        data = _a.sent();
                        data.__META__.timer.push("[" + (currentPlugin.title || currentPlugin.partten) + "]\u7684\u6267\u884C\u65F6\u95F4\uFF1A" + (Date.now() - start) + "ms");
                        console.log("[" + (currentPlugin.title || currentPlugin.partten) + "]\u7684\u6267\u884C\u65F6\u95F4\uFF1A" + (Date.now() - start) + "ms");
                        if (!currentPlugin.successFlow) return [3 /*break*/, 8];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.executePlugins(seneca, currentPlugin.successFlow, data)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_1 = _a.sent();
                        console.log("执行了成功插件！");
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 14];
                    case 9:
                        e_2 = _a.sent();
                        if (currentPlugin.force) {
                            return [3 /*break*/, 2];
                        }
                        if (!currentPlugin.errFlow) return [3 /*break*/, 13];
                        _a.label = 10;
                    case 10:
                        _a.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, this.executePlugins(seneca, currentPlugin.errFlow, data)];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        e_3 = _a.sent();
                        console.log("执行了错误插件！");
                        return [3 /*break*/, 13];
                    case 13: throw e_2;
                    case 14: return [3 /*break*/, 2];
                    case 15: return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 调用单个插件
     * 1. 判断条件是否满足；
     * 2. 执行插件，入错出错，重复执行，最多执行retry次；
     * 3. 处理数据，返回data
     * @param seneca seneca
     * @param plugin 插件实例
     * @param data   数据
     */
    ExecutePluginService.prototype.executePlugin = function (seneca, plugin, data) {
        if (data === void 0) { data = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var res, jsonatas, res, retry, curRetryIndex, result, isError, e_4, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!plugin.condition) return [3 /*break*/, 2];
                        return [4 /*yield*/, seneca.actAsync("role:crawler.plugin.transform,cmd:single", {
                                data: data,
                                expression: plugin.condition
                            })];
                    case 1:
                        res = _a.sent();
                        if (res.result !== true) {
                            return [2 /*return*/, data];
                        }
                        _a.label = 2;
                    case 2:
                        jsonatas = {};
                        if (!(plugin.jsonata && plugin.jsonata.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, seneca.actAsync("role:crawler.plugin.transform,cmd:muti", {
                                data: data,
                                expressions: plugin.jsonata
                            })];
                    case 3:
                        res = _a.sent();
                        res.result.forEach(function (r) {
                            jsonatas = seneca.util.deepextend({}, jsonatas, r || {});
                        });
                        _a.label = 4;
                    case 4:
                        console.log("\u5F00\u59CB\u6267\u884C\uFF1A" + (plugin.title || plugin.partten) + "-----");
                        retry = plugin.retry || 1, curRetryIndex = 0, isError = false;
                        // 最大5次重试
                        if (retry > 5) {
                            retry = 5;
                        }
                        _a.label = 5;
                    case 5:
                        if (!(curRetryIndex < retry)) return [3 /*break*/, 10];
                        curRetryIndex++;
                        data.__META__.retry[plugin.partten] = 1;
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, seneca.actAsync(plugin.partten, Object.assign({ timeout$: plugin.timeout || 30000 }, jsonatas, plugin.data))];
                    case 7:
                        result = _a.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        e_4 = _a.sent();
                        if (curRetryIndex >= retry) {
                            isError = true;
                            if (plugin.force) {
                                return [3 /*break*/, 10];
                            }
                            throw new Error(plugin.title + "----" + e_4.message);
                        }
                        data.__META__.retry[plugin.partten]++;
                        return [3 /*break*/, 9];
                    case 9: return [3 /*break*/, 5];
                    case 10:
                        if (!(plugin.result && !isError)) return [3 /*break*/, 12];
                        return [4 /*yield*/, seneca.actAsync("role:crawler.plugin.transform,cmd:single", {
                                data: result,
                                expression: plugin.result
                            })];
                    case 11:
                        res = _a.sent();
                        data = seneca.util.deepextend({}, data, res.result || {});
                        _a.label = 12;
                    case 12: return [2 /*return*/, data];
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _.each(plugins, function (plugin) {
                    if (!seneca.has(plugin.partten)) {
                        throw new Error("\u6CA1\u6709\u627E\u5230partten:" + plugin.partten);
                    }
                });
                return [2 /*return*/, true];
            });
        });
    };
    ExecutePluginService = __decorate([
        inversify_1.injectable()
    ], ExecutePluginService);
    return ExecutePluginService;
}());
exports.ExecutePluginService = ExecutePluginService;
;
//# sourceMappingURL=plugin.js.map