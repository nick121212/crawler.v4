import { Component, Inject } from '@nestjs/common';
import { TypeOrmDatabaseService } from '../database/database.service';
import { Repository, ObjectType, Entity } from 'typeorm';
import { Service } from '../database/database.interface';
import { DbService } from "../db/db.service";
import { DbInstanceService } from "../db/db.instance.service";
import { Website } from "../../entities/website";
import { Flow } from "../../entities/flow";

@Component()
export class WebsiteService extends DbService<Website> {

    /**
     * Simple constructor - notice the injection of the TypeOrmDatabaseService instance.
     *
     * For example purposes, the constructor is calling a simple seed method which creates some entries in the database
     * for us if none exist.
     *
     * @param databaseService
     */
    constructor(databaseService: DbInstanceService, @Inject('entityClassOrName') entityClassOrName: any) {
        super(databaseService, entityClassOrName);
    }

    public async seed(): Promise<void> {
        const entityRepository = await this.repository;
        let count = await entityRepository.count();
        if (count === 0) {
            let entity = new Website('jd', "京东网", "");

            entity.flow = new Flow("测试队列");

            await entityRepository.persist([entity]);
            console.log('Seeded website.');
        }
    }
}
