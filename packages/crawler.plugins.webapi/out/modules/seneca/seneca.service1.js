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
const common_1 = require("@nestjs/common");
let Seneca1Service = class Seneca1Service {
    constructor() {
        var express = require('express');
        var bodyParser = require('body-parser');
        var cookieParser = require('cookie-parser');
        var seneca = require('seneca')();
        seneca.use('entity');
        seneca.use('basic');
        seneca.use('redis-store', {
            uri: 'redis://47.92.126.120:6379',
            options: {
                password: "crawler"
            }
        });
        seneca.use('user');
        seneca.ready(function () {
            var app = express();
            app.use(cookieParser());
            app.use(bodyParser.json());
            app.listen(3003);
            console.log("djfakldjlfakldj-------------- ready");
        });
    }
};
Seneca1Service = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [])
], Seneca1Service);
exports.Seneca1Service = Seneca1Service;
//# sourceMappingURL=seneca.service1.js.map