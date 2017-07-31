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
var OriginSeneca = require("seneca");
var bluebird = require("bluebird");
var inversify = require("inversify");
var inversify_1 = require("inversify");
// import * as _ from 'lodash';
var config_1 = require("./contansts/config");
var config_2 = require("./config");
var Seneca = (function () {
    function Seneca(container, options) {
        var _this = this;
        this._container = container;
        this._seneca = OriginSeneca(options);
        this.config = new config_2.ConfigService();
        bluebird.promisifyAll(this._seneca);
        this._seneca.use("entity");
        var originMake = this._seneca.private$.entity.make$;
        // 使得entity可以使用promise方法
        bluebird.promisifyAll(this._seneca.private$.entity.__proto__, {
            context: this._seneca.private$.entity,
            filter: function (name, func, target) {
                var names = name.split('');
                if (names.pop() === "$") {
                    target[names.join("") + "Async"] = bluebird.promisify(func, { context: _this._seneca.private$.entity });
                }
                return false;
            }
        });
        this.prePlugins();
        // this.config.
    }
    Object.defineProperty(Seneca.prototype, "seneca", {
        get: function () {
            return this._seneca;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 包装act
     * @param 参数
     * target: 包装的方法所在的类
     * partten: act 的partten
     * key: 方法的名字
     * options: 额外参数
     */
    Seneca.prototype.initAct = function (name, _a, globalOptions) {
        var _this = this;
        var target = _a.target, partten = _a.partten, key = _a.key, _b = _a.options, options = _b === void 0 ? {} : _b;
        this._seneca.add(partten, options, function (msg, reply) { return __awaiter(_this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._container.getNamed(config_1.Types._plugin, name)[key](msg, Object.assign({ seneca: reply.seneca }, options, {}), globalOptions)];
                    case 1:
                        result = _a.sent();
                        reply(null, result);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        reply(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * 包装wrap
     * @param 参数
     * target: 包装的方法所在的类
     * partten: act 的partten
     * key: 方法的名字
     * options: 额外参数
     */
    Seneca.prototype.initWrap = function (name, _a, globalOptions) {
        var _this = this;
        var target = _a.target, partten = _a.partten, key = _a.key, _b = _a.options, options = _b === void 0 ? {} : _b;
        this._seneca.wrap(partten, options, function (msg, reply) { return __awaiter(_this, void 0, void 0, function () {
            var result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._container.getNamed(config_1.Types._plugin, name)[key](msg, Object.assign({ seneca: reply.seneca }, options, {}), globalOptions)];
                    case 1:
                        result = _a.sent();
                        reply.seneca.prior(msg, reply);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        reply(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Seneca.prototype.prePlugins = function () {
        if (this.config.config) {
            for (var key in this.config.config.plugins.pre) {
                if (this.config.config.plugins.pre.hasOwnProperty(key)) {
                    var element = this.config.config.plugins.pre[key];
                    this._seneca.use(key, element || {});
                }
            }
            for (var key in this.config.config.plugins.after) {
                if (this.config.config.plugins.after.hasOwnProperty(key)) {
                    var element = this.config.config.plugins.after[key];
                    this._seneca.use(key, element || {});
                }
            }
        }
    };
    /**
     * 初始化插件
     */
    Seneca.prototype.initPlugin = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var plugins = this._container.getAll(config_1.Types._plugin);
        if (plugins) {
            plugins.forEach(function (plugin) {
                var pluginInfo = Reflect.getMetadata(config_1.SenecaConfig._plugin, plugin.constructor);
                var addList = Reflect.getMetadata(config_1.SenecaConfig._add, plugin.constructor) || [];
                var wrapList = Reflect.getMetadata(config_1.SenecaConfig._wrap, plugin.constructor) || [];
                var initList = Reflect.getMetadata(config_1.SenecaConfig._init, plugin.constructor) || [];
                _this._seneca.use(function () {
                    addList.forEach(function (add) { return _this.initAct(plugin.name, add, options[pluginInfo.name]); });
                    wrapList.forEach(function (wrap) { return _this.initWrap(plugin.name, wrap, options[pluginInfo.name]); });
                    initList.forEach(function (init) { return _this.initAct(plugin.name, Object.assign({ partten: "init:" + pluginInfo.name }, init, {}), options[pluginInfo.name]); });
                    return pluginInfo.name;
                });
            });
        }
    };
    return Seneca;
}());
Seneca = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Object, Object])
], Seneca);
exports.Seneca = Seneca;
//# sourceMappingURL=seneca.js.map