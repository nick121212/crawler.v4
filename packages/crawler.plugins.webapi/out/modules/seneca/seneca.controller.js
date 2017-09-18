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
const core_1 = require("@nestjs/core");
const Joi = require("joi");
const seneca_service_1 = require("./seneca.service");
const validate_pipe_1 = require("../../pipes/validate.pipe");
let SenecaController = class SenecaController {
    constructor(senecaService) {
        this.senecaService = senecaService;
    }
    act(res, parttern, config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.senecaService.seneca.has(parttern)) {
                throw new core_1.HttpException("没有发现parttern:" + parttern, 404);
            }
            console.log(parttern, config);
            try {
                res.send(yield this.senecaService.seneca.actAsync(parttern, config || {}));
            }
            catch (e) {
                throw new core_1.HttpException(e.message, 405);
            }
        });
    }
    getMembers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.senecaService.seneca.actAsync("role:mesh,get:members");
            res.send(data);
        });
    }
    actTest2(res, parttern) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.senecaService.seneca.list(parttern);
            res.send(data);
        });
    }
    actTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.senecaService.seneca.actAsync("role:crawler.plugin.queue,cmd:queue", {
                "queueConfig": {
                    "domainWhiteList": ["(.*?).jd.com"],
                    "fetchConditions": [],
                    "filterByDomain": true,
                    "host": "www.jd.com",
                    "ignoreWWWDomain": false,
                    "initialPort": 80,
                    "initialProtocol": "https",
                    "scanSubdomains": true,
                    "stripQuerystring": false,
                    "stripWWWDomain": false,
                },
                "urls": ["https://search.jd.com/search?keyword=%E6%B2%99%E5%8F%91&enc=utf-8&ev=exbrand_%E8%8A%9D%E5%8D%8E%E4%BB%95%EF%BC%88CHEERS%EF%BC%89/"]
            });
            let data1 = yield this.senecaService.seneca.actAsync("role:mesh,get:members");
            console.log(data1);
            res.send(data);
        });
    }
};
__decorate([
    common_1.Post('act'),
    common_1.UsePipes(new validate_pipe_1.JoiValidatorPipe(Joi.object().required(), ({ data }) => data === 'config')),
    common_1.UsePipes(new validate_pipe_1.JoiValidatorPipe(Joi.string().required(), ({ data }) => data === 'parttern')),
    __param(0, common_1.Res()), __param(1, common_1.Body('parttern')), __param(2, common_1.Body('config')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SenecaController.prototype, "act", null);
__decorate([
    common_1.Get('members'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SenecaController.prototype, "getMembers", null);
__decorate([
    common_1.Post('find'),
    __param(0, common_1.Res()), __param(1, common_1.Body('parttern')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SenecaController.prototype, "actTest2", null);
__decorate([
    common_1.Get('act'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SenecaController.prototype, "actTest", null);
SenecaController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [seneca_service_1.SenecaService])
], SenecaController);
exports.SenecaController = SenecaController;
//# sourceMappingURL=seneca.controller.js.map