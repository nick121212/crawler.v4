"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var JparseFunc = /** @class */ (function () {
    function JparseFunc() {
    }
    JparseFunc.prototype.init = function (exp) {
        exp.assign("jparse", this.combine);
    };
    JparseFunc.prototype.combine = function (objs) {
        if (objs.constructor !== String) {
            throw new Error("第一个参数有问题");
        }
        return JSON.parse(objs);
    };
    JparseFunc = __decorate([
        inversify_1.injectable()
    ], JparseFunc);
    return JparseFunc;
}());
exports.JparseFunc = JparseFunc;
//# sourceMappingURL=jparse.js.map