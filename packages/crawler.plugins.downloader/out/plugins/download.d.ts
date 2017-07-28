export declare class DownloadPlugin {
    private proxy;
    /**
     * 下载数据
     * @param param0
     */
    html({queueItem, proxyInfo, engine}: {
        queueItem: any;
        proxyInfo: any;
        engine: string;
    }): any;
    inter({url, path, params, data, header, method, engine}: any): any;
}
