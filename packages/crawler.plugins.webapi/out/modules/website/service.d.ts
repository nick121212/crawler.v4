import { DbService } from "../db/db.service";
import { DbInstanceService } from "../db/db.instance.service";
import { Website } from "../../entities/website";
export declare class WebsiteService extends DbService<Website> {
    constructor(databaseService: DbInstanceService, entityClassOrName: any);
    seed(): Promise<void>;
}
