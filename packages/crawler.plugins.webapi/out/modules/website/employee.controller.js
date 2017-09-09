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
const employee_service_1 = require("./employee.service");
let EmployeesController = class EmployeesController {
    constructor(employeesService) {
        this.employeesService = employeesService;
    }
    addEmployee(res, employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const addedEmployee = yield this.employeesService.add(employee);
            res.status(common_1.HttpStatus.CREATED).json(addedEmployee);
        });
    }
    getAllEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.employeesService.getAll();
            res.status(common_1.HttpStatus.OK).json(employees);
        });
    }
    getEmployee(req, res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = req.employee;
            console.log("dfkajkldf");
            res.status(common_1.HttpStatus.OK).json(existingEmployee);
        });
    }
    replaceEmployee(req, res, employee, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = req.employee;
            const replacedEmployee = yield this.employeesService.update(employee);
            res.status(common_1.HttpStatus.OK).json(replacedEmployee);
        });
    }
    deleteEmployee(req, res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = req.employee;
            const deletedEmployee = yield this.employeesService.remove(existingEmployee);
            res.status(common_1.HttpStatus.OK).json(deletedEmployee);
        });
    }
};
__decorate([
    common_1.Post('employees'),
    __param(0, common_1.Res()), __param(1, common_1.Body('employee')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "addEmployee", null);
__decorate([
    common_1.Get('employees'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "getAllEmployees", null);
__decorate([
    common_1.Get('employees/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "getEmployee", null);
__decorate([
    common_1.Put('employees/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body('employee')), __param(3, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "replaceEmployee", null);
__decorate([
    common_1.Delete('employees/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "deleteEmployee", null);
EmployeesController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeesController);
exports.EmployeesController = EmployeesController;
//# sourceMappingURL=employee.controller.js.map