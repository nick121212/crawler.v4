import { Repository, FindManyOptions } from 'typeorm';
import { Service } from '../database/database.interface';
import { DbInstanceService } from "./db.instance.service";
export declare abstract class DbService<T> implements Service<T> {
    protected databaseService: DbInstanceService;
    protected entityClassOrName: string | {
        new (): T;
    };
    constructor(databaseService: DbInstanceService, entityClassOrName: string | {
        new (): T;
    });
    readonly repository: Promise<Repository<T>>;
    add(entity: T): Promise<T>;
    addAll(entities: T[]): Promise<T[]>;
    getAll(options?: FindManyOptions<T>): Promise<T[]>;
    get(id: number): Promise<T>;
    update(entity: T): Promise<T>;
    remove(entity: T): Promise<T>;
    abstract seed(): void;
}
