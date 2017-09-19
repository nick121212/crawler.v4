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
var _ = require("lodash");
var pathToRegexp = require("path-to-regexp");
var Joi = require("joi");
var constants_1 = require("../constants");
var plugin_1 = require("../libs/plugin");
var PluginPlugin = (function () {
    function PluginPlugin() {
    }
    /**
    * 找到当前queueItem对应的规则配置
    * @param queueItem 链接的数据
    * @param pages     定义的page
    */
    PluginPlugin.prototype.getFieldFlow = function (_a) {
        var queueItem = _a.queueItem, pages = _a.pages;
        var rules = _.filter(pages, function (_a) {
            var path = _a.path;
            var pathToReg = pathToRegexp(path.toString(), []);
            return pathToReg.test(queueItem.path || "");
        });
        if (!rules.length) {
            console.error("\u6CA1\u6709\u627E\u5230" + queueItem.path + "\u7684\u5339\u914D\u89C4\u5219\uFF01");
            return null;
        }
        return _.first(rules).msgFlow || [];
    };
    /**
     * 测试一个流
     * @param config        流配置
     * @param options       seneca的options
     * @param globalOptions 全局options
     */
    PluginPlugin.prototype.testFlow = function (config, options, globalOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var rtn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pluginService.execute(options.seneca, config.msgFlow, config.data)];
                    case 1:
                        rtn = _a.sent();
                        return [2 /*return*/, rtn];
                }
            });
        });
    };
    return PluginPlugin;
}());
__decorate([
    inversify_1.inject(plugin_1.ExecutePluginService),
    __metadata("design:type", plugin_1.ExecutePluginService)
], PluginPlugin.prototype, "pluginService", void 0);
__decorate([
    crawler_plugins_common_1.Add("role:" + constants_1.pluginResultName + ",cmd:addItemToQueue"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], PluginPlugin.prototype, "getFieldFlow", null);
__decorate([
    crawler_plugins_common_1.Add("role:" + constants_1.pluginResultName + ",cmd:testFlow"),
    __param(0, crawler_plugins_common_1.Validate(Joi.object().keys({
        msgFlow: Joi.array().required(),
        data: Joi.any().required()
    }), { allowUnknown: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PluginPlugin.prototype, "testFlow", null);
PluginPlugin = __decorate([
    crawler_plugins_common_1.Plugin(constants_1.pluginResultName),
    inversify_1.injectable()
], PluginPlugin);
exports.PluginPlugin = PluginPlugin;
//# sourceMappingURL=plugin.js.map