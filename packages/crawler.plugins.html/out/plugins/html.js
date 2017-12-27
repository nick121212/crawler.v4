"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var inversify_1 = require("inversify");
var _ = require("lodash");
var pathToRegexp = require("path-to-regexp");
var crawler_plugins_common_1 = require("crawler.plugins.common");
var joi = require("joi");
var analysis_1 = require("../libs/analysis");
var constants_1 = require("../constants");
// const Pool = require("threads").Pool;
// const pool = new Pool();
var HtmlPlugin = /** @class */ (function () {
    function HtmlPlugin() {
    }
    HtmlPlugin.prototype.html = function (_a, options) {
        var _b = _a.queueItem, queueItem = _b === void 0 ? {} : _b, _c = _a.pages, pages = _c === void 0 ? [] : _c;
        return __awaiter(this, void 0, void 0, function () {
            var start, urls, results, rules, _i, rules_1, rule, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!queueItem) {
                            return [2 /*return*/, []];
                        }
                        start = Date.now();
                        urls = [];
                        results = [];
                        rules = _.filter(pages, function (_a) {
                            var path = _a.path;
                            var pathToReg = pathToRegexp(path.toString(), []);
                            return pathToReg.test(queueItem.path);
                        });
                        if (!(rules.length && queueItem.responseBody)) return [3 /*break*/, 4];
                        _i = 0, rules_1 = rules;
                        _c.label = 1;
                    case 1:
                        if (!(_i < rules_1.length)) return [3 /*break*/, 4];
                        rule = rules_1[_i];
                        _b = (_a = results).push;
                        return [4 /*yield*/, analysis_1.default.doDeal(queueItem, rule)];
                    case 2:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log(queueItem.url, "耗时：", Date.now() - start);
                        return [2 /*return*/, results];
                }
            });
        });
    };
    __decorate([
        crawler_plugins_common_1.Add("role:" + constants_1.pluginName + ",cmd:html"),
        __param(0, crawler_plugins_common_1.Validate(joi.object().keys({
            queueItem: joi.object().keys({
                path: joi.string().required().label("路径")
            }).required(),
            pages: joi.array().required().min(1).items(joi.object().keys({
                path: joi.string().required()
            }))
        }), { allowUnknown: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], HtmlPlugin.prototype, "html", null);
    HtmlPlugin = __decorate([
        crawler_plugins_common_1.Plugin(constants_1.pluginName),
        inversify_1.injectable()
    ], HtmlPlugin);
    return HtmlPlugin;
}());
exports.HtmlPlugin = HtmlPlugin;
//# sourceMappingURL=html.js.map