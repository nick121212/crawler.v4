"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
/**
 * 处理html文本策越
 */
var Strategy = (function () {
    function Strategy() {
    }
    /**
     * 转换成数字类型
     * @param reseult {Any}
     * @returns {String}
     */
    Strategy.prototype.doDeal = function (result, settings) {
        var res = result;
        try {
            if (settings.parse) {
                res = JSON.parse(res);
            }
            if (_.isFunction(settings.func)) {
                res = settings.func.call(this, res);
            }
        }
        catch (e) {
            return {};
        }
        return res;
    };
    return Strategy;
}());
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=json.js.map