import { CrawlerBaseEntity } from "./base";
export declare class User extends CrawlerBaseEntity {
    id: number;
    nick: string;
    email: string;
    name: string;
    active: boolean;
    when: Date;
    salt: string;
    pass: string;
}
