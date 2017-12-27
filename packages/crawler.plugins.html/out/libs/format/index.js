"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requireDir = require("require-directory");
var _ = require("lodash");
var FormatStrategy = /** @class */ (function () {
    function FormatStrategy() {
        var _this = this;
        this.formats = {};
        _.each(requireDir(module, "./"), function (format, key) {
            _this.formats[key] = format.default;
        });
    }
    /**
     * 开始处理文本
     * @param result      {Any}    数据
     * @param config      {Object} 配置
     * @returns Any
     */
    FormatStrategy.prototype.doDeal = function (key, result, settings) {
        if (settings === void 0) { settings = {}; }
        var strategy = this.formats[key];
        if (!strategy) {
            return result;
        }
        try {
            return strategy.doDeal(result, settings);
        }
        catch (e) {
            return result;
        }
    };
    return FormatStrategy;
}());
exports.FormatStrategy = FormatStrategy;
exports.default = new FormatStrategy();
//# sourceMappingURL=index.js.map