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
const typeorm_1 = require("typeorm");
const base_1 = require("./base");
let Login = class Login extends base_1.CrawlerBaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Login.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Login.prototype, "nick", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Login.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Login.prototype, "active", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Login.prototype, "when", void 0);
Login = __decorate([
    typeorm_1.Entity()
], Login);
exports.Login = Login;
//# sourceMappingURL=login.js.map