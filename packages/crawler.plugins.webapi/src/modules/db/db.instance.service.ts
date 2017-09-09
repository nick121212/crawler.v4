import { Component } from '@nestjs/common';
import { TypeOrmDatabaseService } from '../database/database.service';
import { Repository, ObjectType, Entity } from 'typeorm';
import { Service } from '../database/database.interface';

@Component()
export class DbInstanceService {

    /**
     * Simple constructor - notice the injection of the TypeOrmDatabaseService instance.
     *
     * For example purposes, the constructor is calling a simple seed method which creates some entries in the database
     * for us if none exist.
     *
     * @param databaseService
     */
    constructor(public databaseService: TypeOrmDatabaseService) {

    }

}
