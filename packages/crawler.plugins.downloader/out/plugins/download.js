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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var proxy_1 = require("../proxy");
var constants_1 = require("../constants");
var html_1 = require("../models/html");
var inter_1 = require("../models/inter");
var DownloadPlugin = /** @class */ (function () {
    function DownloadPlugin() {
    }
    /**
     * get请求
     * @param param0
     */
    DownloadPlugin.prototype.html = function (_a) {
        var queueItem = _a.queueItem, proxyInfo = _a.proxyInfo, _b = _a.header, header = _b === void 0 ? {} : _b, charset = _a.charset, _c = _a.engine, engine = _c === void 0 ? "superagent" : _c;
        return __awaiter(this, void 0, void 0, function () {
            var start, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = Date.now();
                        /**
                         * 添加接口信息
                         */
                        this.proxy.proxy.loadConfig({
                            "engine": engine,
                            "interfaces": [{
                                    "key": "download",
                                    "method": "get",
                                    "path": "",
                                    "title": ""
                                }],
                            "key": "download",
                            "state": "html",
                            "states": {
                                "html": queueItem.url
                            },
                            "title": "download下载接口",
                        });
                        return [4 /*yield*/, this.proxy.proxy.execute("/download/download", {
                                settings: {
                                    header: header,
                                    charset: charset,
                                    proxyInfo: proxyInfo
                                }
                            })];
                    case 1:
                        res = _a.sent();
                        console.log(queueItem.url, "-----downloader 成功；耗时：", Date.now() - start, "ms");
                        return [2 /*return*/, {
                                crawlerCount: 1 * (queueItem.crawlerCount || 0) + 1,
                                header: res.headers,
                                responseBody: res.body,
                                statusCode: res.statusCode,
                            }];
                }
            });
        });
    };
    /**
     * 调用接口
     * @param params 参数
     */
    DownloadPlugin.prototype.inter = function (_a) {
        var url = _a.url, _b = _a.path, path = _b === void 0 ? "" : _b, params = _a.params, data = _a.data, header = _a.header, _c = _a.method, method = _c === void 0 ? "get" : _c, _d = _a.engine, engine = _d === void 0 ? "superagent" : _d, _e = _a.charset, charset = _e === void 0 ? "utf-8" : _e;
        return __awaiter(this, void 0, void 0, function () {
            var start, rtn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = Date.now();
                        this.proxy.proxy.loadConfig({
                            "engine": engine,
                            "interfaces": [{
                                    "key": "interface",
                                    "method": method,
                                    "path": path,
                                    "title": ""
                                }],
                            "key": "download",
                            "state": "interface",
                            "states": {
                                "interface": url
                            },
                            "title": "download下载接口",
                        });
                        console.log("-----------");
                        return [4 /*yield*/, this.proxy.proxy.execute("/download/interface", {
                                data: data,
                                params: params,
                                settings: { header: header, charset: charset }
                            }).then(function (res) {
                                return {
                                    responseBody: res.body,
                                    header: res.headers,
                                    statusCode: res.statusCode,
                                };
                            })];
                    case 1:
                        rtn = _a.sent();
                        console.log(url, "-----downloader 成功；耗时：", Date.now() - start, "ms");
                        return [2 /*return*/, rtn];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(proxy_1.Proxy),
        __metadata("design:type", proxy_1.Proxy)
    ], DownloadPlugin.prototype, "proxy", void 0);
    __decorate([
        crawler_plugins_common_1.Add("role:" + constants_1.pluginName + ",cmd:html"),
        __param(0, crawler_plugins_common_1.Validate(html_1.htmlJoi, { allowUnknown: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], DownloadPlugin.prototype, "html", null);
    __decorate([
        crawler_plugins_common_1.Add("role:" + constants_1.pluginName + ",cmd:interfaces"),
        __param(0, crawler_plugins_common_1.Validate(inter_1.interJoi, { allowUnknown: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], DownloadPlugin.prototype, "inter", null);
    DownloadPlugin = __decorate([
        crawler_plugins_common_1.Plugin(constants_1.pluginName),
        inversify_1.injectable()
    ], DownloadPlugin);
    return DownloadPlugin;
}());
exports.DownloadPlugin = DownloadPlugin;
//# sourceMappingURL=download.js.map