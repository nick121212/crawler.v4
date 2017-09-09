import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToMany } from 'typeorm';

import { CrawlerBaseEntity } from "./base";
import { Flow } from "./flow";

@Entity()
export class Plugin extends CrawlerBaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public parttern: string;

    @Column({
        length: 10000
    })
    public joiSchema: string;

    @ManyToMany(type => Flow, flow => flow.plugins, {
        cascadeInsert: true,
        cascadeUpdate: true
    })
    public flows: Array<Flow>;
}
