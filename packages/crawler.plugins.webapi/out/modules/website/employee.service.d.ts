import { DbService } from "../db/db.service";
import { DbInstanceService } from "../db/db.instance.service";
import { Employee } from "./employee.entity";
export declare class EmployeeService extends DbService<Employee> {
    constructor(databaseService: DbInstanceService, entityClassOrName: any);
    seed(): Promise<void>;
}
