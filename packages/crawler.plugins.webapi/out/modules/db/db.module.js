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
const db_config_1 = require("./db.config");
const db_instance_service_1 = require("./db.instance.service");
const database_service_1 = require("../database/database.service");
let DbModule = class DbModule {
};
DbModule = __decorate([
    common_1.Module({
        components: [
            database_service_1.TypeOrmDatabaseService,
            db_instance_service_1.DbInstanceService,
            { provide: database_config_1.TypeOrmDatabaseConfig, useClass: db_config_1.DbDatabaseConfig },
        ],
        exports: [db_instance_service_1.DbInstanceService],
        modules: [],
    })
], DbModule);
exports.DbModule = DbModule;
//# sourceMappingURL=db.module.js.map