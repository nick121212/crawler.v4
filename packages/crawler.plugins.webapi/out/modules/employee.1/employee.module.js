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
const employee_service_1 = require("./employee.service");
const employee_entity_1 = require("./employee.entity");
const employee_controller_1 = require("./employee.controller");
const employee_find_middleware_1 = require("./employee.find.middleware");
let EmployeeModule = class EmployeeModule {
    configure(consumer) {
        consumer.apply(employee_find_middleware_1.EmployeeFindMiddleware).forRoutes({
            method: common_1.RequestMethod.ALL, path: 'employees/:id'
        });
        return consumer;
    }
};
EmployeeModule = __decorate([
    common_1.Module({
        components: [
            employee_service_1.EmployeeService,
            { provide: "entityClassOrName", useValue: employee_entity_1.Employee }
        ],
        controllers: [employee_controller_1.EmployeesController],
        modules: [
            db_module_1.DbModule
        ],
    })
], EmployeeModule);
exports.EmployeeModule = EmployeeModule;
//# sourceMappingURL=employee.module.js.map