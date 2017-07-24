"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var jsdom_1 = require("../html/jsdom");
var Strategy = (function () {
    function Strategy() {
    }
    /**
     * 数组类型,直接返回空数组
     * @param queueItem {Object}
     * @param areas {Object}
     * @returns Promise
     */
    Strategy.prototype.doDeal = function (queueItem, areas) {
        var promises = [];
        // 遍历
        _.each(areas, function (area, key) {
            promises.push(jsdom_1.default.doDeal(queueItem, area));
        });
        // 执行
        return Promise.all(promises).then(function (results) {
            return _.keyBy(results, function (res) {
                if (res && res.data) {
                    return res.data.key;
                }
                return Date.now();
            });
        });
    };
    return Strategy;
}());
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=area.js.map