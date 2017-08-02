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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var modelproxy_1 = require("modelproxy");
var constants_1 = require("./constants");
var container_1 = require("./container");
var Proxy = (function () {
    function Proxy() {
        this.init();
    }
    Object.defineProperty(Proxy.prototype, "proxy", {
        get: function () {
            return this._proxy;
        },
        enumerable: true,
        configurable: true
    });
    Proxy.prototype.init = function () {
        var _this = this;
        var engines = container_1.container.getAll(constants_1.Types.engine);
        this._proxy = new modelproxy_1.modelProxy.Proxy();
        engines.forEach(function (engine) {
            _this._proxy.addEngines((_a = {},
                _a[engine.engineName] = engine,
                _a));
            var _a;
        });
    };
    return Proxy;
}());
Proxy = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], Proxy);
exports.Proxy = Proxy;
//# sourceMappingURL=proxy.js.map