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
var proxy_1 = require("../proxy");
var constants_1 = require("../constants");
var DownloadPlugin = (function () {
    function DownloadPlugin() {
    }
    /**
     * 下载数据
     * @param param0
     */
    DownloadPlugin.prototype.html = function (_a, options) {
        var queueItem = _a.queueItem, proxyInfo = _a.proxyInfo, _b = _a.save, save = _b === void 0 ? true : _b, _c = _a.header, header = _c === void 0 ? {} : _c, charset = _a.charset, _d = _a.engine, engine = _d === void 0 ? "superagent" : _d;
        return __awaiter(this, void 0, void 0, function () {
            var res, expireSeneca, download;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /**
                         * 添加接口信息
                         */
                        this.proxy.proxy.loadConfig({
                            "key": "download",
                            "title": "download下载接口",
                            "state": "html",
                            "engine": engine,
                            "states": {
                                "html": queueItem.url
                            },
                            "interfaces": [{
                                    "path": "",
                                    "method": "get",
                                    "key": "download",
                                    "title": ""
                                }]
                        });
                        return [4 /*yield*/, this.proxy.proxy.execute("/download/download", {
                                settings: {
                                    header: header,
                                    charset: charset
                                }
                            })];
                    case 1:
                        res = _a.sent();
                        if (!save) return [3 /*break*/, 3];
                        expireSeneca = options.seneca.delegate({ expire$: 60 });
                        download = expireSeneca.make$('downloads', __assign({ id: queueItem._id, data: res.statusCode }, queueItem, { responseBody: res.body }));
                        return [4 /*yield*/, download.saveAsync()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, {
                            statusCode: res.statusCode,
                            responseBody: save ? null : res.body,
                            crawlerCount: ~~queueItem.crawlerCount + 1
                        }];
                }
            });
        });
    };
    DownloadPlugin.prototype.inter = function (_a) {
        var url = _a.url, _b = _a.path, path = _b === void 0 ? "" : _b, params = _a.params, data = _a.data, header = _a.header, _c = _a.method, method = _c === void 0 ? "get" : _c, _d = _a.engine, engine = _d === void 0 ? "superagent" : _d, _e = _a._id, _id = _e === void 0 ? "" : _e;
        /**
         * 添加接口信息
         */
        this.proxy.proxy.loadConfig({
            "key": "download",
            "title": "download下载接口",
            "state": "interface",
            "engine": engine,
            "states": {
                "interface": url
            },
            "interfaces": [{
                    "path": path,
                    "method": method,
                    "key": "interface",
                    "title": ""
                }]
        });
        /**
         * 调用接口
         */
        return this.proxy.proxy.execute("/download/interface", {
            data: data,
            params: params,
            settings: { header: header }
        }).then(function (res) {
            return {
                statusCode: res.statusCode,
                responseBody: res.body
            };
        });
    };
    return DownloadPlugin;
}());
__decorate([
    inversify_1.inject(proxy_1.Proxy),
    __metadata("design:type", proxy_1.Proxy)
], DownloadPlugin.prototype, "proxy", void 0);
__decorate([
    crawler_plugins_common_1.Add("role:" + constants_1.pluginName + ",cmd:html"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DownloadPlugin.prototype, "html", null);
__decorate([
    crawler_plugins_common_1.Add("role:" + constants_1.pluginName + ",cmd:interfaces"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DownloadPlugin.prototype, "inter", null);
DownloadPlugin = __decorate([
    crawler_plugins_common_1.Plugin(constants_1.pluginName),
    inversify_1.injectable()
], DownloadPlugin);
exports.DownloadPlugin = DownloadPlugin;
//# sourceMappingURL=download.js.map