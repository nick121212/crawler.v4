"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
/**
 * string值处理
 */
var Strategy = (function () {
    function Strategy() {
    }
    /**
     * 开始处理文本,去掉左右空格,去掉中间空格,去掉制表符
     * @param result      {String} dom节点的值
     * @returns {String}
     */
    Strategy.prototype.doDeal = function (result, settings) {
        if (_.isString(result)) {
            if (settings.start) {
                result = _.trimStart(result);
            }
            if (settings.end) {
                result = _.trimEnd(result);
            }
            if (settings.middle) {
                result = result.replace(/\r\n/gi, "");
            }
        }
        return result;
    };
    return Strategy;
}());
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=trim.js.map