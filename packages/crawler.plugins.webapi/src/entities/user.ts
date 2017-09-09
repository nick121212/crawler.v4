import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToMany } from 'typeorm';

import { CrawlerBaseEntity } from "./base";

@Entity()
export class User extends CrawlerBaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public nick: string;

    @Column()
    public email: string;

    @Column()
    public name: string;

    @Column()
    public active: boolean;

    @Column()
    public when: Date;

    @Column()
    public salt: string;

    @Column()
    public pass: string;
}
