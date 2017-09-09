import { ConnectionOptions } from 'typeorm';
import { TypeOrmDatabaseConfig } from '../database/database.config';
export declare class DbDatabaseConfig extends TypeOrmDatabaseConfig {
    getConfiguration(): ConnectionOptions;
}
