import { CrawlerBaseEntity } from "./base";
import { Flow } from "./flow";
export declare class Plugin extends CrawlerBaseEntity {
    id: number;
    title: string;
    parttern: string;
    joiSchema: string;
    flows: Array<Flow>;
}
