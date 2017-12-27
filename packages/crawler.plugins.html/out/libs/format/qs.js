"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qs = require("qs");
var jpp = require("json-pointer");
var _ = require("lodash");
/**
 * 处理html文本策越
 */
var Strategy = /** @class */ (function () {
    function Strategy() {
    }
    /**
     * 处理数据，获取querystring中键值
     * @returns {String}
     */
    Strategy.prototype.doDeal = function (result, data) {
        if (!_.isString(result)) {
            return null;
        }
        var query = result;
        if (result.indexOf("?") >= 0) {
            query = query.substr(query.indexOf("?") + 1);
        }
        if (result.indexOf("#") >= 0) {
            query = query.substr(query.indexOf("#") + 1);
        }
        var noSparse = qs.parse(result);
        return jpp(noSparse).get(data.pointer || "");
    };
    return Strategy;
}());
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=qs.js.map