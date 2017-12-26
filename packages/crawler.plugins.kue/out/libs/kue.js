"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var KueSchedule = require("kue-scheduler");
/**
 * agenda服务
 */
var KueService = /** @class */ (function () {
    /**
     * 构造函数
     * @param configFactory 配置文件服务类
     */
    function KueService(config) {
        this.queue = KueSchedule.createQueue(__assign({ prefix: 'q', jobEvents: true }, config));
        this.queue.inactive(function (err, ids) {
            console.log(ids);
        });
        this.queue.enableExpiryNotifications();
        // this.queue.clear();
        this.queue.on("restore error", function (error) {
            console.log(error);
        }).on("scheduler unknown job expiry key", function (err) {
            console.log(err);
        });
        KueSchedule.app.listen(3000);
    }
    KueService = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [Object])
    ], KueService);
    return KueService;
}());
exports.KueService = KueService;
//# sourceMappingURL=kue.js.map