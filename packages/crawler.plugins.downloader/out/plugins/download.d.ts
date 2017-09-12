export declare class DownloadPlugin {
    private proxy;
    /**
     * 下载数据
     * @param param0
     */
    html({queueItem, proxyInfo, save, header, charset, engine}: {
        charset: string;
        save: boolean;
        header: any;
        queueItem: any;
        proxyInfo: any;
        engine: string;
    }, options: any): Promise<{
        crawlerCount: number;
        responseBody: any;
        statusCode: number | undefined;
    }>;
    inter({url, path, params, data, header, method, engine, _id}: any): any;
}
