"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Strategy = (function () {
    function Strategy() {
    }
    /**
     * 正则匹配数据
     * @returns {String}
     */
    Strategy.prototype.doDeal = function (result, settings) {
        var datas = result.split(settings.splitOf || " ");
        datas = _.slice(datas, ~~settings.start, _.isNumber(settings.end) ? settings.end : datas.length);
        if (settings.join) {
            return _.slice(datas, ~~settings.start, _.isNumber(settings.end) ? settings.end : datas.length).join(settings.join);
        }
        return datas;
    };
    return Strategy;
}());
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=split.js.map