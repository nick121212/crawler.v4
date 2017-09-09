import { CrawlerBaseEntity } from "./base";
export declare class Reset extends CrawlerBaseEntity {
    id: number;
    nick: string;
    user: number;
    active: boolean;
    when: Date;
}
