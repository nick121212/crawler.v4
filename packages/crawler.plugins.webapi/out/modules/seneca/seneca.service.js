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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crawler_plugins_common_1 = require("crawler.plugins.common");
const inversify = require("inversify");
const path = require("path");
const common_1 = require("@nestjs/common");
const wellknown = require("nodemailer-wellknown");
let SenecaService = class SenecaService {
    constructor() {
        const container = new inversify.Container();
        const seneca = new crawler_plugins_common_1.Seneca(container, {
            tag: "crawler.plugins.webapi"
        });
        this.seneca = seneca.seneca;
        seneca.seneca.use("mail", {
            config: Object.assign({ auth: {
                    pass: "871225feng",
                    user: "nick121212",
                } }, wellknown("126"), { secureConnection: true }),
            folder: path.join(__dirname, "../../../", "/emails"),
            mail: {
                from: "crawler <nick121212@126.com>",
                subject: "爬虫邮件"
            }
        });
        seneca.seneca.ready(() => __awaiter(this, void 0, void 0, function* () {
            console.log("crawler.plugins.webapi ready!;");
        }));
    }
};
SenecaService = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [])
], SenecaService);
exports.SenecaService = SenecaService;
//# sourceMappingURL=seneca.service.js.map