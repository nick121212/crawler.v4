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
const db_service_1 = require("../db/db.service");
const db_instance_service_1 = require("../db/db.instance.service");
const website_1 = require("../../entities/website");
const flow_1 = require("../../entities/flow");
let WebsiteService = class WebsiteService extends db_service_1.DbService {
    /**
     * Simple constructor - notice the injection of the TypeOrmDatabaseService instance.
     *
     * For example purposes, the constructor is calling a simple seed method which creates some entries in the database
     * for us if none exist.
     *
     * @param databaseService
     */
    constructor(databaseService, entityClassOrName) {
        super(databaseService, entityClassOrName);
    }
    seed() {
        return __awaiter(this, void 0, void 0, function* () {
            const entityRepository = yield this.repository;
            let count = yield entityRepository.count();
            if (count === 0) {
                let entity = new website_1.Website('jd', "京东网", "");
                entity.flow = new flow_1.Flow("测试队列");
                yield entityRepository.persist([entity]);
                console.log('Seeded website.');
            }
        });
    }
};
WebsiteService = __decorate([
    common_1.Component(),
    __param(1, common_1.Inject('entityClassOrName')),
    __metadata("design:paramtypes", [db_instance_service_1.DbInstanceService, Object])
], WebsiteService);
exports.WebsiteService = WebsiteService;
//# sourceMappingURL=service.js.map