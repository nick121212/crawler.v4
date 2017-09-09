import { CrawlerBaseEntity } from "./base";
export declare class Login extends CrawlerBaseEntity {
    id: number;
    nick: string;
    user: number;
    active: boolean;
    when: Date;
}
