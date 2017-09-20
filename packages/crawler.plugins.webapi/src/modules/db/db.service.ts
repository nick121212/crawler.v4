import { Component } from '@nestjs/common';
import { TypeOrmDatabaseService } from '../database/database.service';
import { Repository, ObjectType, Entity, FindManyOptions } from 'typeorm';
import { Service } from '../database/database.interface';
import { DbInstanceService } from "./db.instance.service";

@Component()
export abstract class DbService<T> implements Service<T> {

    /**
     * Simple constructor - notice the injection of the TypeOrmDatabaseService instance.
     *
     * For example purposes, the constructor is calling a simple seed method which creates some entries in the database
     * for us if none exist.
     *
     * @param databaseService
     */
    constructor(protected databaseService: DbInstanceService, protected entityClassOrName: string | { new(): T; }) {
        this.seed();
    }

    /**
     * Internal async getter for the T Repository - `getRepository()` is async because it may need to connect.
     * @returns {Promise<Repository<T>>}
     */
    public get repository(): Promise<Repository<T>> {
        return this.databaseService.databaseService.getRepository<T>(this.entityClassOrName);
    }

    // C
    public async add(entity: T): Promise<T> {
        return (await this.repository).persist(entity);
    }

    public async addAll(entities: T[]): Promise<T[]> {
        return (await this.repository).persist(entities);
    }

    // R
    public async getAll(options?: FindManyOptions<T>): Promise<T[]> {
        return (await this.repository).find(options || {});
    }

    public async get(id: number): Promise<T> {
        return (await this.repository).findOneById(id) as any;
    }

    // U
    public async update(entity: T): Promise<T> {
        return (await this.repository).persist(entity);
    }

    // D
    public async remove(entity: T): Promise<T> {
        return (await this.repository).remove(entity);
    }

    public abstract seed(): void;
}
