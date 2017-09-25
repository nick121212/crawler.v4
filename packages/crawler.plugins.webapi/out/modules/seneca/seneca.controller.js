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
    /**
     * 调用插件
     * @param res      Response
     * @param parttern 模式
     * @param config   模式所需的数据
     */
    act(res, parttern, config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.senecaService.seneca.has(parttern)) {
                throw new core_1.HttpException("没有发现parttern:" + parttern, 404);
            }
            try {
                res.send(yield this.senecaService.seneca.actAsync(parttern, config || {}));
            }
            catch (e) {
                throw new core_1.HttpException(e.message, 405);
            }
        });
    }
    getMembers(res) {
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
    addBusiness(pdt_sku, business_id, business_sku_url, show_price, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.senecaService.seneca.actAsync("role:crawler.plugin.queue,cmd:queue", {
                "queueConfig": {
                    "domainWhiteList": ["(.*?).jd.com", "(.*?).tmall.com"],
                    "fetchConditions": [],
                    "filterByDomain": true,
                    "ignoreWWWDomain": false,
                    "initialPort": 80,
                    "initialProtocol": "https",
                    "scanSubdomains": false,
                    "stripQuerystring": false,
                    "stripWWWDomain": false,
                },
                "queueItem": {
                    "path": "/",
                    "url": business_id === 1 ? "https://detail.tmall.com" : "https://item.jd.com"
                },
                "urls": [business_sku_url]
            });
            if (!data.length || data[0] === false) {
                throw new core_1.HttpException("地址不符合规则！", 406);
            }
            let queueItem = data[0];
            queueItem = Object.assign({}, queueItem, {
                pdt_sku,
                business_id,
                business_sku_url,
                show_price
            });
            // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            yield this.senecaService.seneca.actAsync("role:crawler.plugin.task,cmd:addItemToQueue", {
                "items": [{ queueItem }],
                "key": "bijia"
            });
            res.send(queueItem);
        });
    }
};
__decorate([
    common_1.Post("act"),
    common_1.UsePipes(new validate_pipe_1.JoiValidatorPipe(Joi.object().required(), ({ data }) => data === "config")),
    common_1.UsePipes(new validate_pipe_1.JoiValidatorPipe(Joi.string().required(), ({ data }) => data === "parttern")),
    __param(0, common_1.Res()), __param(1, common_1.Body("parttern")), __param(2, common_1.Body("config")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SenecaController.prototype, "act", null);
__decorate([
    common_1.Get("members"),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SenecaController.prototype, "getMembers", null);
__decorate([
    common_1.Post("find"),
    __param(0, common_1.Res()), __param(1, common_1.Body("parttern")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SenecaController.prototype, "actTest2", null);
__decorate([
    common_1.Post("addBusiness"),
    common_1.UsePipes(new validate_pipe_1.JoiValidatorPipe(Joi.string().label("pdt_sku").required(), ({ data }) => data === "pdt_sku")),
    common_1.UsePipes(new validate_pipe_1.JoiValidatorPipe(Joi.number().label("business_id").required(), ({ data }) => data === "business_id")),
    common_1.UsePipes(new validate_pipe_1.JoiValidatorPipe(Joi.string().label("business_sku_url").required(), ({ data }) => data === "business_sku_url")),
    __param(0, common_1.Body("pdt_sku")),
    __param(1, common_1.Body("business_id")),
    __param(2, common_1.Body("business_sku_url")),
    __param(3, common_1.Body("show_price")), __param(4, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, String, Object]),
    __metadata("design:returntype", Promise)
], SenecaController.prototype, "addBusiness", null);
SenecaController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [seneca_service_1.SenecaService])
], SenecaController);
exports.SenecaController = SenecaController;
//# sourceMappingURL=seneca.controller.js.map