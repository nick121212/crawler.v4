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
const common_1 = require("@nestjs/common");
const db_instance_service_1 = require("./db.instance.service");
let DbService = class DbService {
    /**
     * Simple constructor - notice the injection of the TypeOrmDatabaseService instance.
     *
     * For example purposes, the constructor is calling a simple seed method which creates some entries in the database
     * for us if none exist.
     *
     * @param databaseService
     */
    constructor(databaseService, entityClassOrName) {
        this.databaseService = databaseService;
        this.entityClassOrName = entityClassOrName;
        this.seed();
    }
    /**
     * Internal async getter for the T Repository - `getRepository()` is async because it may need to connect.
     * @returns {Promise<Repository<T>>}
     */
    get repository() {
        return this.databaseService.databaseService.getRepository(this.entityClassOrName);
    }
    // C
    add(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.repository).persist(entity);
        });
    }
    addAll(entities) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.repository).persist(entities);
        });
    }
    // R
    getAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.repository).find(options || {});
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.repository).findOneById(id);
        });
    }
    // U
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.repository).persist(entity);
        });
    }
    // D
    remove(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.repository).remove(entity);
        });
    }
};
DbService = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [db_instance_service_1.DbInstanceService, Object])
], DbService);
exports.DbService = DbService;
//# sourceMappingURL=db.service.js.map