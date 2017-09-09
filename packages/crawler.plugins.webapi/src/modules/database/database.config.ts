
import { Component } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';

@Component()
export abstract class TypeOrmDatabaseConfig {
    public abstract getConfiguration(): ConnectionOptions;
}
