import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn, OneToOne, JoinTable, ManyToOne } from 'typeorm';

import { CrawlerBaseEntity } from "./base";
import { Flow } from "./flow";

@Entity()
export class Website extends CrawlerBaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public description: string;

    @Column()
    public initUrls: string;

    @ManyToOne(type => Flow, flow => flow.websites, {
        cascadeInsert: true,
        cascadeRemove: true,
        cascadeUpdate: true
    })
    public flow: Flow;

    constructor(title: string, description: string, initUrls: string) {
        super();

        this.title = title;
        this.description = description;
        this.initUrls = initUrls;
    }
}
