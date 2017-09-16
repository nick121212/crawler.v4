export declare class EsStorePlugin {
    private client;
    /**
     * 保存分析出来的链接地址
     * 先判断地址是不是已经在es中
     * 存在的话，则不存入queue中
     * @param urls 连接数组
     */
    private saveUrls({urls, esIndex, esType});
    /**
     * 存储当前的地址
     * @param queueItem  数据
     * @param esIndex    索引
     * @param esType     类型
     */
    private saveQueueItem({queueItem, esIndex, esType});
    /**
    * 存储当前的地址
    * @param result  数据
    * @param esIndex 索引
    * @param esType  类型
    */
    private saveResult({result, id, esIndex, esType});
    private init(msg, options, globalOptions);
    private getItem({_id, esIndex, esType});
    private pick(result, fields);
}
