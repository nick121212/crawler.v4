import { IQueueItem } from "../libs/queueitem";
export declare class QueuePlugin {
    /**
     * 分析urls
     * @param param0
     */
    getUrls({queueItem, discoverConfig, queueConfig}: {
        queueItem: IQueueItem;
        discoverConfig: any;
        queueConfig: any;
    }): Promise<any[]>;
    /**
     * 地址规范化
     * @param param0
     */
    queueUrl({urls, queueItem, queueConfig}: any): Promise<(boolean | IQueueItem)[]>;
}
