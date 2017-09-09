import { CrawlerBaseEntity } from "./base";
import { Flow } from "./flow";
export declare class Website extends CrawlerBaseEntity {
    id: number;
    title: string;
    description: string;
    initUrls: string;
    flow: Flow;
    constructor(title: string, description: string, initUrls: string);
}
