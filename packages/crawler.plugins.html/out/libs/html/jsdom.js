"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var jsdom = require("jsdom");
var _fs = require("fs");
var jquery = _fs.readFileSync(__dirname + "/../../../node_modules/jquery/dist/jquery.min.js", "utf-8");
var JsDomDealStrategy = /** @class */ (function () {
    function JsDomDealStrategy() {
    }
    /**
     * 处理一个字段
     * @param queueItem 爬取的数据
     * @param data      单个数据配置
     * @param $         dom节点
     * @param index     数组中，节点的索引
     */
    JsDomDealStrategy.prototype.doDeal = function (queueItem, data, $, index) {
        var _this = this;
        var $sel, result, len = 0;
        var $noSelcSel;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.load(queueItem, $)];
                    case 1:
                        // 载入当前的cheerio根节点
                        $ = _a.sent();
                        // 如果存在index，则获取索引节点
                        if (typeof index === "number" && $.length > index) {
                            $sel = $.eq(index);
                        }
                        try {
                            $noSelcSel = $sel || $;
                            // 查找当前的dom
                            $sel = this.doFindSelector($noSelcSel, data.selector);
                            len = $sel ? $sel.length : 0;
                            if (len && data.methodInfo) {
                                $sel = this.doRemoveEle($sel, data.removeSelector);
                                result = this.doCallMethod($sel, data.methodInfo);
                            }
                            resolve({
                                result: result,
                                data: _.cloneDeep(data),
                                $cur: $sel,
                                $noSelcSel: $noSelcSel,
                                $parent: $,
                                len: len,
                                index: index
                            });
                        }
                        catch (e) {
                            reject(e);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
    * 获取dom元素
    * @param queueItem 抓取数据详情
    * @param $ jquery对象
    */
    JsDomDealStrategy.prototype.load = function (queueItem, $) {
        return new Promise(function (resolve, reject) {
            if ($) {
                return resolve($);
            }
            jsdom.env({
                html: queueItem.responseBody.replace(/iframe/g, "iframe1"),
                parsingMode: "html",
                src: [jquery],
                done: function (err, window) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(window.$("body"));
                }
            });
        });
    };
    /**
     * 删除选择器的元素
     * @param $sel       当前dom元素
     * @param selector   选择器
     */
    JsDomDealStrategy.prototype.doRemoveEle = function ($sel, selector) {
        if (!_.isArray(selector)) {
            selector = [selector];
        }
        _.each(selector, function (sel) {
            try {
                $sel.find(sel).remove();
            }
            catch (e) {
                console.log(e.message);
            }
        });
        return $sel;
    };
    /**
     * 取得元素节点
     * @param $        dom元素
     * @param selector 选择器
     * @return cheerio对象
     */
    JsDomDealStrategy.prototype.doFindSelector = function ($, selector) {
        var _this = this;
        var $sel = $;
        if (!selector) {
            selector = [];
        }
        if (!_.isArray(selector) && typeof selector === "string") {
            selector = [selector];
        }
        if (!_.isArray(selector)) {
            return $sel;
        }
        _.each(selector, function (sel) {
            switch (typeof sel) {
                case "string":
                    $sel = $sel.find(sel);
                    break;
                case "object":
                    $sel = _this.doCallMethod($sel, sel);
                    break;
            }
            if (!$sel.length) {
                return false;
            }
        });
        return $sel;
    };
    /**
     * 调用方法
     * @param $           dom元素
     * @param methodInfo  调用的方法名称
     * @returns {*}
     */
    JsDomDealStrategy.prototype.doCallMethod = function ($, methodInfo) {
        var $sel = null;
        _.forEach(methodInfo, function (params, method) {
            if (params && !_.isArray(params)) {
                params = [params];
            }
            $sel = $[method].apply($, params || []);
        });
        return $sel;
    };
    return JsDomDealStrategy;
}());
exports.JsDomDealStrategy = JsDomDealStrategy;
exports.default = new JsDomDealStrategy();
//# sourceMappingURL=jsdom.js.map