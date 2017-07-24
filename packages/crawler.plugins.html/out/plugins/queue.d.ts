import { IQueueItem } from "../libs/queueitem";
export declare class QueuePlugin {
    getUrls({queueItem, discoverConfig, queueConfig}: {
        queueItem: IQueueItem;
        discoverConfig: any;
        queueConfig: any;
    }): Promise<any[]>;
}
