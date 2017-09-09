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
const employee_entity_1 = require("./employee.entity");
let EmployeeService = class EmployeeService extends db_service_1.DbService {
    constructor(databaseService, entityClassOrName) {
        super(databaseService, entityClassOrName);
    }
    seed() {
        return __awaiter(this, void 0, void 0, function* () {
            const employeesRepository = yield this.repository;
            let count = yield employeesRepository.count();
            if (count === 0) {
                const employees = yield employeesRepository.persist([new employee_entity_1.Employee('John Doe', 30), new employee_entity_1.Employee('Jane Doe', 40)]);
                console.log('Seeded Employees.');
                console.log(employees);
            }
        });
    }
};
EmployeeService = __decorate([
    common_1.Component(),
    __param(1, common_1.Inject('entityClassOrName')),
    __metadata("design:paramtypes", [db_instance_service_1.DbInstanceService, Object])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map