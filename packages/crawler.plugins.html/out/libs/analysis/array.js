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
var jpp = require("json-pointer");
var base_1 = require("./base");
var jsdom_1 = require("../html/jsdom");
var Strategy = /** @class */ (function (_super) {
    __extends(Strategy, _super);
    /**
     * 构造函数
     * 注册默认的解析策略
     */
    function Strategy() {
        return _super.call(this) || this;
    }
    /**
     * 数组的情况下执行
     * @param queueItem {Object}  链接信息
     * @param data      {Object}  配置数据
     * @param results   {Object}  结果数据
     * @param $         {Object}  父jquery对象
     * @param index     {Number}  jquery索引
     * @returns Promise
     */
    Strategy.prototype.doDeal = function (queueItem, data, results, $, index) {
        var _this = this;
        var jData = jpp(results);
        var path = [];
        var idx = _.isUndefined(data.dataIndex) ? index : data.dataIndex;
        var resource;
        if (_.isNumber(idx) && _.isArray(results)) {
            path.push(idx.toString());
        }
        if (data.key) {
            path.push(data.key);
        }
        if (!jData.has(jpp.compile(path))) {
            jData.set(jpp.compile(path), []);
        }
        results = jData.get(jpp.compile(path));
        return jsdom_1.default.doDeal(queueItem, data, $, index).then(function (res) {
            var promises = [];
            res.result = results;
            for (var i = 0, n = res.len; i < n; i++) {
                res.result.push({});
                promises = promises.concat(_this.doDealData(queueItem, data.data ? data.data.concat([]) : [], res.result, res.$cur, i));
            }
            resource = res;
            return promises;
        }).then(function (promises) {
            if (promises.length) {
                return Promise.all(promises).then(function (cases) {
                    var rtnResults = [];
                    _.each(cases, function (casee) {
                        if (casee) {
                            rtnResults.push(casee);
                        }
                    });
                    return rtnResults;
                });
            }
            return resource;
        });
    };
    return Strategy;
}(base_1.Base));
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=array.js.map