import { DbService } from "../db/db.service";
import { DbInstanceService } from "../db/db.instance.service";
import { Website } from "../../entities/website";
export declare class WebsiteService extends DbService<Website> {
    /**
     * Simple constructor - notice the injection of the TypeOrmDatabaseService instance.
     *
     * For example purposes, the constructor is calling a simple seed method which creates some entries in the database
     * for us if none exist.
     *
     * @param databaseService
     */
    constructor(databaseService: DbInstanceService, entityClassOrName: any);
    seed(): Promise<void>;
}
