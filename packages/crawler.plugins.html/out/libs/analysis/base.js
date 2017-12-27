"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var format_1 = require("../format");
var Base = /** @class */ (function () {
    function Base() {
        this.deals = {};
    }
    /**
     * 处理data数据
     * @param queueItem  {Object}
     * @param data       {Object}
     * @param curResults {Object}
     * @param $          {Object}
     * @param index      {Number}
     * @return {Array<Promise>}
     */
    Base.prototype.doDealData = function (queueItem, data, results, $, index) {
        var _this = this;
        var promises = [];
        var strategy;
        data = data.concat([]);
        _.each(data, function (d) {
            strategy = _this.deals[d.dealStrategy] || _this.deals.normal;
            if (!strategy) {
                throw new Error("\u6CA1\u6709\u627E\u5230" + d.dealStrategy + "\u7684\u5206\u6790\u5668\uFF01");
            }
            else {
                promises.push(strategy.doDeal(queueItem, d, results, $, index));
            }
        });
        return promises;
    };
    /**
     * 数据的格式化函数
     * @param result  {String}
     * @param formats {Array<Object>}
     * @return {String|Number}
     */
    Base.prototype.doFormatData = function (result, formats) {
        var res = result;
        _.each(formats, function (format) {
            res = format_1.default.doDeal(format.key, res, format.settings);
        });
        return res;
    };
    return Base;
}());
exports.Base = Base;
//# sourceMappingURL=base.js.map