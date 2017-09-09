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
const plugin_1 = require("./plugin");
const website_1 = require("./website");
let Flow = class Flow extends base_1.CrawlerBaseEntity {
    constructor(title) {
        super();
        this.title = title;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Flow.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Flow.prototype, "title", void 0);
__decorate([
    typeorm_1.ManyToMany(type => plugin_1.Plugin, plugin => plugin.flows, {
        cascadeInsert: true,
        cascadeUpdate: true
    }),
    __metadata("design:type", Array)
], Flow.prototype, "plugins", void 0);
__decorate([
    typeorm_1.OneToMany(type => website_1.Website, website => website.flow, {}),
    __metadata("design:type", Array)
], Flow.prototype, "websites", void 0);
Flow = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String])
], Flow);
exports.Flow = Flow;
//# sourceMappingURL=flow.js.map