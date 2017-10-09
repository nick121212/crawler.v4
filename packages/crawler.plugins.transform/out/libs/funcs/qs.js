"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var qs = require("qs");
var QsFunc = /** @class */ (function () {
    function QsFunc() {
    }
    QsFunc.prototype.init = function (exp) {
        exp.assign("qs", this.urlparse);
    };
    QsFunc.prototype.urlparse = function (objs, key) {
        if (!objs || objs.constructor !== String) {
            throw new Error("第一个参数有问题");
        }
        var noSparse = qs.parse(objs);
        if (key) {
            return noSparse[key];
        }
        return noSparse;
    };
    QsFunc = __decorate([
        inversify_1.injectable()
    ], QsFunc);
    return QsFunc;
}());
exports.QsFunc = QsFunc;
//# sourceMappingURL=qs.js.map