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
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var base_1 = require("./base");
var requireDir = require("require-directory");
/**
 * 处理html文本策越
 */
var Strategy = (function (_super) {
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
        var _this = this;
        var promiseAll = [];
        var dataResults = {};
        var check = function (results) {
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
                rule: rule
            };
            // return promises.length ? Promise.all(promises).then(check) : dataResults;
        };
        // 处理area
        return this.deals.area.doDeal(queueItem, rule.areas).then(function (results) {
            _.forEach(rule.fields, function (field, key) {
                promiseAll = promiseAll.concat(_this.doDealData.call(_this, queueItem, field.data, dataResults, results[key] ? results[key].$cur : null));
            });
            return Promise.all(promiseAll).then(check.bind(_this));
        });
    };
    return Strategy;
}(base_1.Base));
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=index.js.map