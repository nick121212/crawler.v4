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
     * 普通的情况下执行
     * @returns Promise
     */
    Strategy.prototype.doDeal = function (queueItem, data, results, $, index) {
        var promise = jsdom_1.default.doDeal(queueItem, data, $, index).then(function (res) {
            if (!res.result || res.result.indexOf(res.data.match) < 0) {
                res = null;
            }
            else {
                res.result = results;
                res.$cur = res.$parent;
            }
            return res;
        });
        return promise;
    };
    return Strategy;
}(base_1.Base));
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=case.js.map