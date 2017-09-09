import { Module } from '@nestjs/common';
import { DatabaseModule } from "../database/database.module";
import { DbService } from "./db.service";
import { TypeOrmDatabaseConfig } from "../database/database.config";
import { DbDatabaseConfig } from "./db.config";
import { DbInstanceService } from "./db.instance.service";
import { TypeOrmDatabaseService } from "../database/database.service";

@Module({
    components: [
        TypeOrmDatabaseService,
        DbInstanceService,
        { provide: TypeOrmDatabaseConfig, useClass: DbDatabaseConfig },
    ],
    exports: [DbInstanceService],
    modules: [],
})
export class DbModule { }
