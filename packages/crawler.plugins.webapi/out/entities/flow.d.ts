import { CrawlerBaseEntity } from "./base";
import { Plugin } from "./plugin";
import { Website } from "./website";
export declare class Flow extends CrawlerBaseEntity {
    id: number;
    title: string;
    plugins: Array<Plugin>;
    websites: Array<Website>;
    constructor(title: string);
}
