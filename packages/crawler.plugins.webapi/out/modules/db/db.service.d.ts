import { Repository, FindManyOptions } from 'typeorm';
import { Service } from '../database/database.interface';
import { DbInstanceService } from "./db.instance.service";
export declare abstract class DbService<T> implements Service<T> {
    protected databaseService: DbInstanceService;
    protected entityClassOrName: string | {
        new (): T;
    };
    /**
     * Simple constructor - notice the injection of the TypeOrmDatabaseService instance.
     *
     * For example purposes, the constructor is calling a simple seed method which creates some entries in the database
     * for us if none exist.
     *
     * @param databaseService
     */
    constructor(databaseService: DbInstanceService, entityClassOrName: string | {
        new (): T;
    });
    /**
     * Internal async getter for the T Repository - `getRepository()` is async because it may need to connect.
     * @returns {Promise<Repository<T>>}
     */
    readonly repository: Promise<Repository<T>>;
    add(entity: T): Promise<T>;
    addAll(entities: T[]): Promise<T[]>;
    getAll(options?: FindManyOptions<T>): Promise<T[]>;
    get(id: number): Promise<T>;
    update(entity: T): Promise<T>;
    remove(entity: T): Promise<T>;
    abstract seed(): void;
}
