import { EntityManager, Repository, ObjectType } from 'typeorm';
import { TypeOrmDatabaseConfig } from './database.config';
export declare class TypeOrmDatabaseService {
    private readonly databaseConfig;
    private _connection;
    constructor(databaseConfig: TypeOrmDatabaseConfig);
    private readonly connection;
    getEntityManager(): Promise<EntityManager>;
    getRepository<T>(entityClassOrName: ObjectType<T> | string): Promise<Repository<T>>;
}
