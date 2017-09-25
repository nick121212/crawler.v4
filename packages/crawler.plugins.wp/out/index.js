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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var crawler_plugins_common_1 = require("crawler.plugins.common");
var container_1 = require("./container");
var seneca = new crawler_plugins_common_1.Seneca(container_1.container, {
    tag: "crawler.plugin.wp"
});
seneca.seneca
    .ready(function () { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        console.log("crawler.plugins.wp ready!");
        data = {
            "hit": {
                "_index": "qa",
                "_type": "mamilove",
                "_id": "d458d9c534b0f67f06674ebed54e2a9c",
                "_score": 1,
                "_source": {
                    "comments": [{
                            "content": "我沒買塑身衣耶!! 我是飲食的控制跟睡前使用2包的超燃素，瘦了12公斤呦~^^", "like": 0
                        }, {
                            "content": "我兒子目前4M18D 我瘦了13公斤😅😅\n我都是正常吃多喝水 習慣每天排便 \n當然還是健康最重要～\n對於產後皮膚鬆弛我都是洗完澡後擦乳液按摩 提供給你參考😀", "like": 0
                        }, {
                            "content": "媽咪想瘦下來嗎？\n我有一個方法很有效，我二個禮拜瘦三公斤唷",
                            "like": 0
                        },
                        {
                            "content": "我是買維娜斯推推指,印象中是4萬左右\n說真的我覺得不貴\n其實我以前亂買的又穿不住的塑身衣加起來根本可以量身訂做一套推推指了\n重點是推推指真的好穿多了\n材質非常透氣好穿、觸感也很輕柔\n我幾乎天天穿,穿一整天沒有問題\n另外我還會穿著推推指搭配一些小運動\n連穿著運動都沒有悶熱感真的很耐穿!!\n這樣維持穿了半年之後 我原本很凸的肚子和肥肥的腰都消腫很多\n身材曲線也更明顯了\n免費改小了很多次喔！",
                            "like": 0
                        }, {
                            "content": "一套一兩千\n但買了超多套買不到好穿的XD",
                            "like": 1
                        }],
                    "title": "\n                            請問大家都花多少錢在產後塑身衣上?\n                                                    ", "createAt": 6, "content": "\n                請問在生產完有買塑身衣來穿的媽咪<br>\n大概是花多少錢在這個部份?<br>\n<br>\n因為有朋友穿塑身衣真的瘦蠻多的<br>\n讓我很心動<br>\n不過發現價錢都不便宜<br>\n想問問各位有穿的媽咪們，大概都是穿了多久才不穿了?<br>\n覺得值得嗎?\n\n                            ",
                    "age": "所有月齡", "category": "懷孕大小事"
                }
            }
        };
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=index.js.map