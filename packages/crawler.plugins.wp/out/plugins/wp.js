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
var crawler_plugins_common_1 = require("crawler.plugins.common");
var bluebird = require("bluebird");
var _ = require("lodash");
var Moment = require("moment");
var constants_1 = require("../constants");
var WpApi = require("wpapi");
var settings = {
    "pages": [{
            "key": "blog-detail",
            "path": "*",
            "areas": [],
            "fieldKey": "",
            "fields": {
                "none": {
                    "data": [{
                            "key": "content",
                            "selector": [".blog-content"],
                            "removeSelector": ["meta", ".comment-bar", "#question_id", "hr:eq(-1) ~ *"],
                            "methodInfo": { "html": [] },
                            "dealStrategy": "normal"
                        }]
                }
            },
            "enabled": true
        }]
};
var WpPlugin = (function () {
    function WpPlugin() {
    }
    WpPlugin.prototype.blog = function (config, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var result, resouce, promises, e_1, e_2, neRresouce, categories, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        promises = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 9]);
                        return [4 /*yield*/, options.seneca.actAsync("role:crawler.plugin.store.es,cmd:getItem", config)];
                    case 2:
                        result = _a.sent();
                        if (result.found) {
                            resouce = result._source;
                        }
                        else {
                            return [2 /*return*/, {}];
                        }
                        return [3 /*break*/, 9];
                    case 3:
                        e_1 = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        if (!(e_1.statusCode.toString() === "404")) return [3 /*break*/, 6];
                        config.esType = "mamilove.blog";
                        return [4 /*yield*/, options.seneca.actAsync("role:crawler.plugin.store.es,cmd:getItem", config)];
                    case 5:
                        result = _a.sent();
                        if (result.found) {
                            resouce = result._source;
                        }
                        else {
                            return [2 /*return*/];
                        }
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_2 = _a.sent();
                        return [2 /*return*/];
                    case 8: return [3 /*break*/, 9];
                    case 9:
                        if (!resouce) {
                            return [2 /*return*/];
                        }
                        if (!resouce.categories) {
                            resouce.categories = [];
                        }
                        return [4 /*yield*/, options.seneca.actAsync("role:crawler.plugin.html,cmd:html", Object.assign({}, settings, {
                                queueItem: {
                                    url: "/",
                                    responseBody: resouce.content
                                }
                            }))];
                    case 10:
                        neRresouce = _a.sent();
                        if (neRresouce.length) {
                            resouce.content = neRresouce[0].result.content;
                        }
                        // 处理category
                        resouce.categories.forEach(function (category) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                promises.push(this.wpApi.categories().search(_.trim(category)).then(function (categoryInfo) {
                                    if (categoryInfo.length) {
                                        return categoryInfo.pop().id;
                                    }
                                    return _this.wpApi.categories().auth({
                                        username: "crawler",
                                        password: "crawler-1314"
                                    }).create({ name: _.trim(category) }, function (data) {
                                        console.log(data);
                                    }).then(function (data) {
                                        if (!data) {
                                            return 0;
                                        }
                                        return data.id;
                                    });
                                }));
                                return [2 /*return*/];
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 11:
                        categories = _a.sent();
                        return [4 /*yield*/, this.wpApi.posts().create({
                                title: resouce.title,
                                content: resouce.content,
                                status: "publish",
                                categories: categories,
                                auther: 5
                            })];
                    case 12:
                        post = _a.sent();
                        return [2 /*return*/, post];
                }
            });
        });
    };
    WpPlugin.prototype.getCategory = function (api, category) {
        return __awaiter(this, void 0, void 0, function () {
            var categories, newCategory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.wpApi[api]().search(category)];
                    case 1:
                        categories = _a.sent();
                        if (categories.length) {
                            return [2 /*return*/, categories[0]];
                        }
                        return [4 /*yield*/, this.wpApi[api]().create({
                                name: _.trim(category)
                            })];
                    case 2:
                        newCategory = _a.sent();
                        return [2 /*return*/, newCategory];
                }
            });
        });
    };
    WpPlugin.prototype.qa = function (config, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var resouce, promises, comments, category, tag, postData, postExist, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resouce = config._source, promises = [];
                        comments = resouce.comments || [];
                        if (!resouce.category) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getCategory("dwqa-question_category", resouce.category)];
                    case 1:
                        category = _a.sent();
                        if (!category) {
                            throw new Error("没有category");
                        }
                        _a.label = 2;
                    case 2:
                        if (!resouce.age) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getCategory("dwqa-question_tag", resouce.age)];
                    case 3:
                        tag = _a.sent();
                        if (!tag) {
                            throw new Error("没有tag");
                        }
                        _a.label = 4;
                    case 4:
                        console.log("tag结束", tag.id, category.id);
                        postData = {
                            title: _.trim(resouce.title),
                            author: 5,
                            comment_status: "open",
                            "dwqa-question_category": category ? [category.id] : null,
                            "dwqa-question_tag": tag ? [tag.id] : null,
                            slug: config._id,
                            content: _.trim(resouce.content),
                            status: "publish",
                            date: Moment().add(comments.length * 3 - 30, "day").format("YYYY-MM-DD hh:mm:ss"),
                            ping_status: "open"
                        };
                        console.log("创建post");
                        return [4 /*yield*/, this.wpApi["dwqa-question"]().slug(config._id).get()];
                    case 5:
                        postExist = _a.sent();
                        if (!postExist.length) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.wpApi["dwqa-question"]().id(postExist[0].id).delete()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        console.log("删除post结束", postExist);
                        return [4 /*yield*/, this.wpApi["dwqa-question"]().create(postData).catch(function (err) {
                                throw err;
                            })];
                    case 8:
                        post = _a.sent();
                        console.log("post结束");
                        comments.forEach(function (comment, idx) { return __awaiter(_this, void 0, void 0, function () {
                            var com;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.wpApi["dwqa-answer"]().create({
                                            title: resouce.title,
                                            post: post.id,
                                            test: 1,
                                            menu_order: 2,
                                            author: 4,
                                            slug: config._id + "dwqa-answer" + idx,
                                            status: "publish",
                                            comment_status: "open",
                                            content: comment.content,
                                            date: Moment().add(idx * 10, "hour").format("YYYY-MM-DD hh:mm:ss"),
                                            ping_status: "open"
                                        }).catch(console.log)];
                                    case 1:
                                        com = _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        console.log("component结束");
                        return [2 /*return*/];
                }
            });
        });
    };
    WpPlugin.prototype.init = function (msg, options, globalOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, WpApi.discover("https://www.bebewiki.com").then(function (site) {
                                return site.auth({
                                    username: "crawler",
                                    password: "crawler-1314"
                                });
                            })];
                    case 1:
                        _a.wpApi = _b.sent();
                        return [4 /*yield*/, bluebird.delay(10)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return WpPlugin;
}());
__decorate([
    crawler_plugins_common_1.Add("role:" + constants_1.pluginName + ",cmd:blog"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WpPlugin.prototype, "blog", null);
__decorate([
    crawler_plugins_common_1.Add("role:" + constants_1.pluginName + ",cmd:qa"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WpPlugin.prototype, "qa", null);
__decorate([
    crawler_plugins_common_1.Init(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], WpPlugin.prototype, "init", null);
WpPlugin = __decorate([
    crawler_plugins_common_1.Plugin(constants_1.pluginName),
    inversify_1.injectable()
], WpPlugin);
exports.WpPlugin = WpPlugin;
//# sourceMappingURL=wp.js.map