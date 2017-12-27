"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var jpp = require("json-pointer");
var base_1 = require("./base");
var jsdom_1 = require("../html/jsdom");
var Strategy = /** @class */ (function (_super) {
    __extends(Strategy, _super);
    /**
     * 构造函数
     * 注册默认的解析策略
     */
    function Strategy() {
        return _super.call(this) || this;
    }
    /**
     * 数组的情况下执行
     * @returns Promise
     */
    Strategy.prototype.doDeal = function (queueItem, data, results, $, index) {
        var promise = jsdom_1.default.doDeal(queueItem, data, $, index).then(function (res) {
            var jData = jpp(results);
            var path = [];
            var idx = _.isUndefined(res.data.dataIndex) ? res.index : res.data.dataIndex;
            if (typeof idx === "number" && _.isArray(results)) {
                path.push(idx.toString());
            }
            if (path) {
                results = jData.get(jpp.compile(path));
            }
            results[data.key] = {};
            res.result = results[data.key];
            if (path) {
                res.index = null;
            }
            return res;
        });
        return promise;
    };
    return Strategy;
}(base_1.Base));
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=object.js.map