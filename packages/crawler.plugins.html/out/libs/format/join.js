"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 处理html文本策越
 */
var Strategy = /** @class */ (function () {
    function Strategy() {
    }
    /**
     * null转换"""
     * @param reseult {Any}
     * @returns {String}
     */
    Strategy.prototype.doDeal = function (result, _a) {
        var join = _a.join;
        try {
            return result.join(join || ",");
        }
        catch (e) {
            // return result;
        }
        return result;
    };
    return Strategy;
}());
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=join.js.map