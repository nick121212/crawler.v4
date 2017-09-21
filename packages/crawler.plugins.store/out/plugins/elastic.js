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
var elasticsearch_1 = require("elasticsearch");
var constants_1 = require("../constants");
var _fields = [
    "protocol",
    "host",
    "query",
    "port",
    "path",
    "depth",
    "url",
    "crawlerCount",
    "errorCount",
    "error",
    "statusCode",
    "responseBody",
    "responseBodyText",
    "@timestamp",
    "status",
    "updatedAt"
];
var EsStorePlugin = (function () {
    function EsStorePlugin() {
    }
    /**
     * 保存分析出来的链接地址
     * 先判断地址是不是已经在es中
     * 存在的话，则不存入queue中
     * @param urls 连接数组
     */
    EsStorePlugin.prototype.saveUrls = function (_a) {
        var urls = _a.urls, esIndex = _a.esIndex, esType = _a.esType;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var urlsById, docs, resources, newUrls, urlsResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlsById = _.keyBy(urls, "_id");
                        docs = [];
                        // console.log(urlsById,urls);
                        _.forEach(urlsById, function (url, key) {
                            docs.push({
                                _index: esIndex,
                                _type: esType,
                                _id: key
                            });
                        });
                        // 判断链接是否存在
                        if (!docs.length) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this.client.mget({
                                body: {
                                    docs: docs
                                },
                                storedFields: ["statusCode"]
                            })];
                    case 1:
                        resources = _a.sent();
                        newUrls = _.filter(resources.docs, function (doc) {
                            if (doc.error && doc.error.type === "index_not_found_exception") {
                                return true;
                            }
                            if (doc.found === false) {
                                return true;
                            }
                            return false;
                        });
                        docs = [];
                        // 保存新增的地址
                        _.each(newUrls, function (url) {
                            if (urlsById[url._id]) {
                                docs.push({
                                    create: {
                                        _index: esIndex,
                                        _type: esType,
                                        _id: url._id
                                    }
                                });
                                docs.push(_this.pick(_.extend({ "@timestamp": Date.now(), status: "queued" }, urlsById[url._id]), _fields));
                            }
                        });
                        if (!docs.length) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.client.bulk({
                                body: docs
                            })];
                    case 2:
                        urlsResult = _a.sent();
                        return [2 /*return*/, urlsResult.items.map(function (url) {
                                if (url.create && url.create.created) {
                                    return urlsById[url.create._id];
                                }
                                return null;
                            })];
                    case 3: return [2 /*return*/, []];
                }
            });
        });
    };
    /**
     * 存储当前的地址
     * @param queueItem  数据
     * @param esIndex    索引
     * @param esType     类型
     */
    EsStorePlugin.prototype.saveQueueItem = function (_a) {
        var queueItem = _a.queueItem, esIndex = _a.esIndex, esType = _a.esType;
        return __awaiter(this, void 0, void 0, function () {
            var docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        docs = [];
                        if (!(queueItem && queueItem._id)) return [3 /*break*/, 2];
                        docs.push({
                            index: {
                                _index: esIndex,
                                _type: esType,
                                _id: queueItem._id
                            }
                        });
                        queueItem.status = "complete";
                        docs.push(this.pick(queueItem, _fields));
                        if (!docs.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.bulk({
                                body: docs
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, {}];
                }
            });
        });
    };
    /**
    * 存储当前的地址
    * @param result  数据
    * @param esIndex 索引
    * @param esType  类型
    */
    EsStorePlugin.prototype.saveResult = function (_a) {
        var result = _a.result, _id = _a._id, esIndex = _a.esIndex, esType = _a.esType;
        return __awaiter(this, void 0, void 0, function () {
            var docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        docs = [];
                        if (!result) return [3 /*break*/, 2];
                        docs.push({
                            index: {
                                _index: esIndex,
                                _type: esType,
                                _id: _id
                            }
                        });
                        docs.push(result);
                        if (!docs.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.bulk({
                                body: docs
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, {}];
                }
            });
        });
    };
    /**
  * 存储当前的地址
  * @param result  数据
  * @param esIndex 索引
  * @param esType  类型
  */
    EsStorePlugin.prototype.createResult = function (_a) {
        var result = _a.result, esIndex = _a.esIndex, esType = _a.esType, _id = _a._id;
        return __awaiter(this, void 0, void 0, function () {
            var docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        docs = [];
                        if (!result) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.create({
                                index: esIndex,
                                type: esType,
                                id: _id,
                                body: result
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, {}];
                }
            });
        });
    };
    EsStorePlugin.prototype.init = function (msg, options, globalOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.client = new elasticsearch_1.Client(globalOptions);
                        this.client.ping({
                            requestTimeout: 1000
                        }).then(function () {
                            console.log("elasticsearh as well");
                        }, function (err) {
                            console.log("elasticsearch cluster is down!", err.message);
                        });
                        return [4 /*yield*/, bluebird.delay(200)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取单个数据
     * @param param0
     * _id es的id
     * esIndex 索引
     * esType  类型
     */
    EsStorePlugin.prototype.getItem = function (_a) {
        var _id = _a._id, esIndex = _a.esIndex, esType = _a.esType;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.get({
                            id: _id,
                            index: esIndex,
                            type: esType
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * pick 字段
     * @param result 数据
     * @param fields 字段
     */
    EsStorePlugin.prototype.pick = function (result, fields) {
        var res = {};
        _.each(fields, function (field) {
            var val = _.pick(result, field);
            if (val && val[field] !== undefined) {
                res[field] = val[field];
            }
        });
        return res;
    };
    return EsStorePlugin;
}());
__decorate([
    crawler_plugins_common_1.Add("role:" + constants_1.pluginEsName + ",cmd:saveUrls"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EsStorePlugin.prototype, "saveUrls", null);
__decorate([
    crawler_plugins_common_1.Add("role:" + constants_1.pluginEsName + ",cmd:saveQueueItem"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EsStorePlugin.prototype, "saveQueueItem", null);
__decorate([
    crawler_plugins_common_1.Add("role:" + constants_1.pluginEsName + ",cmd:saveResult"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EsStorePlugin.prototype, "saveResult", null);
__decorate([
    crawler_plugins_common_1.Add("role:" + constants_1.pluginEsName + ",cmd:createResult"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EsStorePlugin.prototype, "createResult", null);
__decorate([
    crawler_plugins_common_1.Init(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EsStorePlugin.prototype, "init", null);
__decorate([
    crawler_plugins_common_1.Add("role:" + constants_1.pluginEsName + ",cmd:getItem"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EsStorePlugin.prototype, "getItem", null);
EsStorePlugin = __decorate([
    crawler_plugins_common_1.Plugin(constants_1.pluginEsName),
    inversify_1.injectable()
], EsStorePlugin);
exports.EsStorePlugin = EsStorePlugin;
//# sourceMappingURL=elastic.js.map