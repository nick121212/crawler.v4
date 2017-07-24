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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var crawler_common_1 = require("crawler.common");
var proxy_1 = require("../proxy");
var DownloadPlugin = (function () {
    function DownloadPlugin() {
    }
    /**
     * 下载数据
     * @param param0
     */
    DownloadPlugin.prototype.url = function (_a) {
        var queueItem = _a.queueItem, proxyInfo = _a.proxyInfo, engine = _a.engine;
        /**
         * 添加接口信息
         */
        this.proxy.proxy.loadConfig({
            "key": "download",
            "title": "download下载接口",
            "state": "prod",
            "engine": engine || "request",
            "states": {
                "prod": queueItem.url
            },
            "interfaces": [{
                    "path": "/",
                    "method": "get",
                    "key": "download",
                    "title": ""
                }]
        });
        /**
         * 调用接口
         */
        return this.proxy.proxy.execute("/download/download", proxyInfo || {}).then(function (res) {
            return {
                statusCode: res.statusCode,
                responseBody: res.body,
                crawlerCount: ~~queueItem.crawlerCount + 1
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
    crawler_common_1.Add("role:crawler.plugin.downloader,cmd:download"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DownloadPlugin.prototype, "url", null);
DownloadPlugin = __decorate([
    crawler_common_1.Plugin("crawler.plugin.downloader"),
    inversify_1.injectable()
], DownloadPlugin);
exports.DownloadPlugin = DownloadPlugin;
//# sourceMappingURL=download.js.map