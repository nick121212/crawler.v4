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
let Reset = class Reset extends base_1.CrawlerBaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Reset.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Reset.prototype, "nick", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Reset.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Reset.prototype, "active", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Reset.prototype, "when", void 0);
Reset = __decorate([
    typeorm_1.Entity()
], Reset);
exports.Reset = Reset;
//# sourceMappingURL=reset.js.map