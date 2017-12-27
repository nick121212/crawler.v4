"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 处理html文本策越
 */
var Strategy = /** @class */ (function () {
    function Strategy() {
    }
    /**
     * 转换成数字类型
     * @param reseult {Any}
     * @returns {String}
     */
    Strategy.prototype.doDeal = function (result) {
        var res = Number(result);
        if (Number.isNaN(res)) {
            res = 0;
        }
        return res;
    };
    return Strategy;
}());
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=num.js.map