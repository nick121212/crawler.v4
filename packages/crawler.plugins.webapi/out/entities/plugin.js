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
const flow_1 = require("./flow");
let Plugin = class Plugin extends base_1.CrawlerBaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Plugin.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plugin.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Plugin.prototype, "parttern", void 0);
__decorate([
    typeorm_1.Column({
        length: 10000
    }),
    __metadata("design:type", String)
], Plugin.prototype, "joiSchema", void 0);
__decorate([
    typeorm_1.ManyToMany(type => flow_1.Flow, flow => flow.plugins, {
        cascadeInsert: true,
        cascadeUpdate: true
    }),
    __metadata("design:type", Array)
], Plugin.prototype, "flows", void 0);
Plugin = __decorate([
    typeorm_1.Entity()
], Plugin);
exports.Plugin = Plugin;
//# sourceMappingURL=plugin.js.map