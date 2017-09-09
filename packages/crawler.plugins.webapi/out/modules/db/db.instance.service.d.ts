import { TypeOrmDatabaseService } from '../database/database.service';
export declare class DbInstanceService {
    databaseService: TypeOrmDatabaseService;
    constructor(databaseService: TypeOrmDatabaseService);
}
