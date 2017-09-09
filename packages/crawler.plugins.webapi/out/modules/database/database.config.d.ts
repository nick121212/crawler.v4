import { ConnectionOptions } from 'typeorm';
export declare abstract class TypeOrmDatabaseConfig {
    abstract getConfiguration(): ConnectionOptions;
}
