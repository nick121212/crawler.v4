"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var moment = require("moment");
/**
 * 处理html文本策越
 */
var Strategy = (function () {
    function Strategy() {
    }
    /**
     * 转换成日期类型
     * @param reseult {Any}
     * @returns {String}
     */
    Strategy.prototype.doDeal = function (result, settings) {
        var res = moment(_.trim(result), settings.format || "YYYY-MM-DD");
        if (res.isValid()) {
            return res.format(settings.format || "YYYY-MM-DD");
        }
        return "1990-01-01";
    };
    return Strategy;
}());
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=date.js.map