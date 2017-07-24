"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var replaceRegexp = function (str) {
    str = str || "";
    str = str.toString();
    return str.replace(/(^\/)|(\/$)/g, "");
};
/**
 * 处理html文本策越
 */
var Strategy = (function () {
    function Strategy() {
    }
    /**
     * 正则匹配数据
     * @returns {String}
     */
    Strategy.prototype.doDeal = function (result, data) {
        var regexp = new RegExp(replaceRegexp(data.regexp), data.scope || "i");
        var matchs = result.match(regexp);
        var index = data.index || 0;
        if (matchs && matchs.length > index) {
            result = matchs[index];
        }
        else {
            result = "";
        }
        return result;
    };
    return Strategy;
}());
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=regexp.js.map