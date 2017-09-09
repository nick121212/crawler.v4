import { Component } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
import { TypeOrmDatabaseConfig } from '../database/database.config';

@Component()
export class DbDatabaseConfig extends TypeOrmDatabaseConfig {
    public getConfiguration(): ConnectionOptions {
        return {
            autoSchemaSync: true,
            database: process.env.DB_NAME || "crawler",
            entities: [
                __dirname + '/../../entities/*.js'
            ],
            host: process.env.DB_HOST || "localhost",
            password: process.env.DB_PASSWORD || "",
            port: (Number(process.env.DB_PORT)) || 3306,
            type: "mysql",
            username: process.env.DB_USERNAME || "root"
        };
    }
}
