import { Module, NestModule, Shared } from '@nestjs/common';
import { TypeOrmDatabaseService } from "./database.service";
import { TypeOrmDatabaseConfig } from "./database.config";

@Module({
    components: [TypeOrmDatabaseService, TypeOrmDatabaseConfig],
    exports: [TypeOrmDatabaseService]
})
export class DatabaseModule { }
