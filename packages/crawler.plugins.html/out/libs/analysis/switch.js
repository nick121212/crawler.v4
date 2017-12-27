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
     * 数组类型,直接返回空数组
     * @returns Promise
     */
    Strategy.prototype.doDeal = function (queueItem, data, results, $, index) {
        var _this = this;
        return jsdom_1.default.doDeal(queueItem, data, $, index).then(function (res) {
            var promises = [];
            for (var i = 0; i < res.len; i++) {
                promises = promises.concat(_this.doDealData(queueItem, data.data.concat([]), results, res.$cur, i));
            }
            if (promises.length) {
                return Promise.all(promises).then(function (cases) {
                    var rtnResults = [];
                    _.each(cases, function (casee) {
                        if (casee) {
                            _.each(casee.data.data, function (d) {
                                d.dataIndex = res.index;
                            });
                            rtnResults.push(casee);
                        }
                    });
                    return rtnResults;
                });
            }
            return res;
        });
    };
    return Strategy;
}(base_1.Base));
exports.Strategy = Strategy;
exports.default = new Strategy();
//# sourceMappingURL=switch.js.map