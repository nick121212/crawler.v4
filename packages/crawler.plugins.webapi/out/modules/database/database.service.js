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
const typeorm_1 = require("typeorm");
const database_config_1 = require("./database.config");
let TypeOrmDatabaseService = class TypeOrmDatabaseService {
    /**
     * Abstract injection so it is possible to use several databases
     * @param databaseConfig
     */
    constructor(databaseConfig) {
        this.databaseConfig = databaseConfig;
    }
    /**
     * An async getter for the Connection which creates the connection if needed.
     * @returns {Promise<Connection>}
     */
    get connection() {
        // return the connection if it's been created already
        if (this._connection) {
            return Promise.resolve(this._connection);
        }
        // otherwise create it
        return typeorm_1.createConnection(this.databaseConfig.getConfiguration()).then(connection => {
            this._connection = connection;
            return connection;
        }).catch(error => {
            console.log(error);
            throw error;
        });
    }
    /**
     * An async getter for the entity manager.
     *
     * Connects to the database if needed and returns a reference to the EntityManager
     * @returns {Promise<EntityManager>}
     */
    getEntityManager() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.connection).entityManager;
        });
    }
    /**
     * An async getter for repositories.
     *
     * Connects to the database if needed and returns a reference to a Repository for the specified Entity
     * @param entityClassOrName
     * @returns {Promise<Repository<T>>}
     */
    getRepository(entityClassOrName) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.connection).getRepository(entityClassOrName);
        });
    }
};
TypeOrmDatabaseService = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [database_config_1.TypeOrmDatabaseConfig])
], TypeOrmDatabaseService);
exports.TypeOrmDatabaseService = TypeOrmDatabaseService;
//# sourceMappingURL=database.service.js.map