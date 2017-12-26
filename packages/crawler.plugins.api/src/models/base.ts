

import { UpdateDateColumn, CreateDateColumn, VersionColumn } from "typeorm";

export class CrawlerBaseEntity {

    @UpdateDateColumn()
    public updateDate: Date;

    @CreateDateColumn()
    public createDate: Date;

    @VersionColumn()
    public version: number;
}
