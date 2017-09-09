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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const service_1 = require("./service");
let WebsitesController = class WebsitesController {
    constructor(entityService) {
        this.entityService = entityService;
    }
    add(res, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.entityService.add(data);
            res.status(common_1.HttpStatus.CREATED).json(entity);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let entities = yield this.entityService.getAll({
                join: {
                    alias: "website",
                    leftJoinAndSelect: {
                        "flow": "website.flow"
                    }
                }
            });
            let total = yield (yield this.entityService.repository).count();
            res.status(common_1.HttpStatus.OK).json({
                rows: entities,
                total: total
            });
        });
    }
    get(req, res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = req.entity;
            res.status(common_1.HttpStatus.OK).json(entity);
        });
    }
    replace(req, res, data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = req.entity;
            const replacedEmployee = yield this.entityService.update(entity);
            res.status(common_1.HttpStatus.OK).json(replacedEmployee);
        });
    }
    delete(req, res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = req.employee;
            const deletedEntity = yield this.entityService.remove(entity);
            res.status(common_1.HttpStatus.OK).json(deletedEntity);
        });
    }
};
__decorate([
    common_1.Post('/'),
    __param(0, common_1.Res()), __param(1, common_1.Body('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "add", null);
__decorate([
    common_1.Get('/'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "getAll", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "get", null);
__decorate([
    common_1.Put('/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body('entity')), __param(3, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "replace", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "delete", null);
WebsitesController = __decorate([
    common_1.Controller("websites"),
    __metadata("design:paramtypes", [service_1.WebsiteService])
], WebsitesController);
exports.WebsitesController = WebsitesController;
//# sourceMappingURL=controller.js.map