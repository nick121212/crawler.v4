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
var base_1 = require("./base");
var requireDir = require("require-directory");
/**
 * 处理html文本策越
 */
var Strategy = /** @class */ (function (_super) {
    __extends(Strategy, _super);
    /**
     * 构造函数
     * 注册默认的解析策略
     */
    function Strategy() {
        var _this = _super.call(this) || this;
        _.each(requireDir(module, "./"), function (deal, key) {
            if (key !== "base") {
                _this.deals[key] = deal.default;
            }
        });
        _.forEach(_this.deals, function (deal, key) {
            if (deal) {
                deal.deals = _this.deals;
            }
        });
        return _this;
    }
    /**
     * 开始处理文本
     * @param queueItem      {Object}    数据
     * @param rule        {Object} 配置
     * @returns {Promise}
     */
    Strategy.prototype.doDeal = function (queueItem, rule) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var promiseAll, dataResults, check;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promiseAll = [];
                        dataResults = {};
                        check = function (results) {
                            var promises = [];
                            var getPromises = function (rts) {
                                _.forEach(rts, function (result) {
                                    if (_.isArray(result)) {
                                        getPromises(result);
                                    }
                                    else if (result && result.data && result.data.data) {
                                        promises = promises.concat(_this.doDealData.call(_this, queueItem, result.data.data, result.result, result.$cur, result.index));
                                    }
                                });
                            };
                            getPromises(results);
                            return promises.length ? Promise.all(promises).then(check.bind(_this)) : {
                                result: dataResults,
                                rule: rule.key
                            };
                            // return promises.length ? Promise.all(promises).then(check) : dataResults;
                        };
                        return [4 /*yield*/, this.deals.area.doDeal(queueItem, rule.areas).then(function (results) {
                                _.forEach(rule.fields, function (field, key) {
                                    promiseAll = promiseAll.concat(_this.doDealData.call(_this, queueItem, field.data, dataResults, results[key] ? results[key].$cur : null));
                                });
                                return Promise.all(promiseAll).then(check.bind(_this));
                            })];
                    case 1: 
                    // 处理area
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Strategy;
}(base_1.Base));
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=index.js.map