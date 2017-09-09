"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const database_config_1 = require("../database/database.config");
let DbDatabaseConfig = class DbDatabaseConfig extends database_config_1.TypeOrmDatabaseConfig {
    getConfiguration() {
        return {
            autoSchemaSync: true,
            database: process.env.DB_NAME || "crawler",
            entities: [
                __dirname + '/../../entities/*.js'
            ],
            host: process.env.DB_HOST || "localhost",
            password: process.env.DB_PASSWORD || "",
            port: (Number(process.env.DB_PORT)) || 3306,
            type: "mysql",
            username: process.env.DB_USERNAME || "root"
        };
    }
};
DbDatabaseConfig = __decorate([
    common_1.Component()
], DbDatabaseConfig);
exports.DbDatabaseConfig = DbDatabaseConfig;
//# sourceMappingURL=db.config.js.map