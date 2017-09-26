"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 处理html文本策越
 */
var Strategy = (function () {
    function Strategy() {
    }
    /**
     * null转换"""
     * @param reseult {Any}
     * @returns {String}
     */
    Strategy.prototype.doDeal = function (result) {
        if (result === null || result === undefined) {
            return "";
        }
        return result;
    };
    return Strategy;
}());
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=str.js.map