export declare class EsStorePlugin {
    private client;
    /**
     * 启动一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    addToQueue({config}: {
        config: any;
    }, options?: any, globalOptions?: any): Promise<void>;
    pick(result: any, fields: Array<string>): any;
    /**
     * 保存分析出来的链接地址
     * 先判断地址是不是已经在es中
     * 存在的话，则不存入queue中
     * @param urls 连接数组
     */
    saveUrls({urls, esIndex, esType}: {
        urls: Array<any>;
        esIndex: string;
        esType: string;
    }): Promise<Array<any>>;
    /**
     * 存储当前的地址
     * @param queueItem
     * @param esIndex
     * @param esType
     */
    saveQueueItem({queueItem, esIndex, esType}: {
        queueItem: any;
        esIndex: string;
        esType: string;
    }): Promise<any>;
    /**
    * 存储当前的地址
    * @param result
    * @param esIndex
    * @param esType
    */
    saveResult({result, id, esIndex, esType}: {
        id: string;
        result: any;
        esIndex: string;
        esType: string;
    }): Promise<any>;
    init(msg: any, options: any, globalOptions: any): Promise<void>;
}
