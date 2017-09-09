"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const db_module_1 = require("../db/db.module");
const service_1 = require("./service");
const controller_1 = require("./controller");
const find_middleware_1 = require("./find.middleware");
const website_1 = require("../../entities/website");
const result_1 = require("../../middlewares/result");
let WebsiteModule = class WebsiteModule {
    configure(consumer) {
        consumer.apply(find_middleware_1.FindMiddleware).forRoutes({
            method: common_1.RequestMethod.ALL, path: 'websites/:id'
        });
        consumer.apply(result_1.ResultMiddleware).forRoutes(controller_1.WebsitesController);
        return consumer;
    }
};
WebsiteModule = __decorate([
    common_1.Module({
        components: [
            service_1.WebsiteService,
            { provide: "entityClassOrName", useValue: website_1.Website }
        ],
        controllers: [controller_1.WebsitesController],
        modules: [
            db_module_1.DbModule
        ],
    })
], WebsiteModule);
exports.WebsiteModule = WebsiteModule;
//# sourceMappingURL=module.js.map