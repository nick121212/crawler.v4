import { FindManyOptions } from "typeorm";
export interface Service<T> {
    add(entity: T): Promise<T>;
    getAll(options?: FindManyOptions<T>): Promise<T[]>;
    get(id: number): Promise<T>;
    update(entity: T): Promise<T>;
    remove(entity: T): Promise<T>;
}
