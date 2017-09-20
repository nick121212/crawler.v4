import { TypeOrmDatabaseService } from '../database/database.service';
export declare class DbInstanceService {
    databaseService: TypeOrmDatabaseService;
    /**
     * Simple constructor - notice the injection of the TypeOrmDatabaseService instance.
     *
     * For example purposes, the constructor is calling a simple seed method which creates some entries in the database
     * for us if none exist.
     *
     * @param databaseService
     */
    constructor(databaseService: TypeOrmDatabaseService);
}
