import { EntityManager, Repository, ObjectType } from 'typeorm';
import { TypeOrmDatabaseConfig } from './database.config';
export declare class TypeOrmDatabaseService {
    private readonly databaseConfig;
    /**
     * A Connection reference which is reused by all consumers of the database service
     */
    private _connection;
    /**
     * Abstract injection so it is possible to use several databases
     * @param databaseConfig
     */
    constructor(databaseConfig: TypeOrmDatabaseConfig);
    /**
     * An async getter for the Connection which creates the connection if needed.
     * @returns {Promise<Connection>}
     */
    private readonly connection;
    /**
     * An async getter for the entity manager.
     *
     * Connects to the database if needed and returns a reference to the EntityManager
     * @returns {Promise<EntityManager>}
     */
    getEntityManager(): Promise<EntityManager>;
    /**
     * An async getter for repositories.
     *
     * Connects to the database if needed and returns a reference to a Repository for the specified Entity
     * @param entityClassOrName
     * @returns {Promise<Repository<T>>}
     */
    getRepository<T>(entityClassOrName: ObjectType<T> | string): Promise<Repository<T>>;
}
