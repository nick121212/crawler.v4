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
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const Joi = require("joi");
let JoiValidatorPipe = class JoiValidatorPipe {
    constructor(schema, toValidate = (metadata) => true) {
        this.schema = schema;
        this.toValidate = toValidate;
    }
    transform(value, metadata) {
        if (!this.toValidate(metadata)) {
            return value;
        }
        const { error } = Joi.validate(value, this.schema);
        if (error) {
            throw new core_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
        return value;
    }
};
JoiValidatorPipe = __decorate([
    common_1.Pipe(),
    __metadata("design:paramtypes", [Object, Object])
], JoiValidatorPipe);
exports.JoiValidatorPipe = JoiValidatorPipe;
//# sourceMappingURL=validate.pipe.js.map