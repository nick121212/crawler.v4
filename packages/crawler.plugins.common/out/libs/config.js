"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var fs = require("fs");
var events_1 = require("events");
var path = require("path");
/**
 * 获取配置文件的信息
 */
var Configurator = (function (_super) {
    __extends(Configurator, _super);
    /**
     * 构造
     * @param automaticConfigReload 是否自动获取配置文件的更改
     */
    function Configurator(automaticConfigReload) {
        if (automaticConfigReload === void 0) { automaticConfigReload = false; }
        var _this = _super.call(this) || this;
        _this.automaticConfigReload = automaticConfigReload;
        return _this;
    }
    /**
     * 更新配置文件信息
     * @param file 文件的路径
     */
    Configurator.prototype.updateConfig = function (file) {
        var _this = this;
        var filePath = path.resolve(file);
        var config;
        try {
            config = require(filePath);
        }
        catch (e) {
            console.log("配置文件加载失败", e.message);
        }
        fs.watch(file, function (event, filename) {
            if (event === "change" && _this.automaticConfigReload) {
                _this.updateConfig(filename);
                _this.emit("cofigFileChange");
            }
        });
        this.oldConfig = this.config;
        this.config = config;
        this.emit("configfilecomplete");
    };
    return Configurator;
}(events_1.EventEmitter));
exports.Configurator = Configurator;
/**
 * 读取配置文件服务
 *     redis
 *     mq
 */
var ConfigService = (function (_super) {
    __extends(ConfigService, _super);
    function ConfigService() {
        var _this = _super.call(this) || this;
        if (process.env.CONFIG_PATH) {
            return _this.initConfig(process.env.CONFIG_PATH);
        }
        if (process.argv.length < 2 && !process.argv[2]) {
            // $log.error("没有定义config文件!");
            // process.exit(1);
        }
        else {
            // 配置文件载入
            _this.initConfig(process.argv[2]);
        }
        return _this;
    }
    /**
     * 初始化配置文件
     * @param filePath 配置文件路径
     * @param automaticConfigReload
     */
    ConfigService.prototype.initConfig = function (filePath, automaticConfigReload) {
        if (automaticConfigReload === void 0) { automaticConfigReload = false; }
        // if (!fs.existsSync(filePath)) {
        //     return;
        //     // throw new Error(`${filePath}不存在！`);
        // }
        this.configurator = new Configurator(automaticConfigReload);
        this.configurator.updateConfig(filePath);
    };
    Object.defineProperty(ConfigService.prototype, "config", {
        /**
         * 返回配置信息
         */
        get: function () {
            if (!this.configurator) {
                return {};
            }
            return this.configurator.config;
        },
        enumerable: true,
        configurable: true
    });
    return ConfigService;
}(Configurator));
ConfigService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.js.map