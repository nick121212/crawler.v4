/// <reference types="express" />
import { Response } from 'express';
import { EmployeeService } from "./employee.service";
export declare class EmployeesController {
    private employeesService;
    constructor(employeesService: EmployeeService);
    addEmployee(res: Response, employee: any): Promise<void>;
    getAllEmployees(req: any, res: Response): Promise<void>;
    getEmployee(req: any, res: Response, id: any): Promise<void>;
    replaceEmployee(req: any, res: Response, employee: any, id: any): Promise<void>;
    deleteEmployee(req: any, res: Response, id: any): Promise<void>;
}
