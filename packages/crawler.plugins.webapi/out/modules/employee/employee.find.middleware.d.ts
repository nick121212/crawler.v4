import { NestMiddleware } from '@nestjs/common';
import { EmployeeService } from './employee.service';
export declare class EmployeeFindMiddleware implements NestMiddleware {
    private employeesService;
    constructor(employeesService: EmployeeService);
    resolve(): (req: any, res: any, next: any) => Promise<void>;
}
