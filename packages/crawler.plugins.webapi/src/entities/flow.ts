import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import { CrawlerBaseEntity } from "./base";
import { Plugin } from "./plugin";
import { Website } from "./website";

@Entity()
export class Flow extends CrawlerBaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @ManyToMany(type => Plugin, plugin => plugin.flows, {
        cascadeInsert: true,
        cascadeUpdate: true
    })
    public plugins: Array<Plugin>;

    @OneToMany(type => Website, website => website.flow, {})
    public websites: Array<Website>;

    constructor(title: string) {
        super();
        this.title = title;
    }
}
