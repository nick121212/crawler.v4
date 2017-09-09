import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToMany } from 'typeorm';

import { CrawlerBaseEntity } from "./base";

@Entity()
export class Reset extends CrawlerBaseEntity {

    @PrimaryColumn()
    public id: number;

    @Column()
    public nick: string;

    @Column()
    public user: number;

    @Column()
    public active: boolean;

    @Column()
    public when: Date;
}
