import inversify, { injectable, inject } from 'inversify';
import * as Seneca from 'seneca';
import * as request from 'request';
import { Plugin, Add, Wrap, Init } from 'crawler.plugins.common';

import { Proxy } from "../proxy";

@Plugin("crawler.plugin.downloader")
@injectable()
export class DownloadPlugin {
    @inject(Proxy)
    private proxy: Proxy;

    /**
     * 下载数据
     * @param param0 
     */
    @Add("role:crawler.plugin.downloader,cmd:html")
    html({ queueItem, proxyInfo, engine }: { queueItem: any, proxyInfo: any, engine: string }) {
        /**
         * 添加接口信息
         */
        this.proxy.proxy.loadConfig({
            "key": "download",
            "title": "download下载接口",
            "state": "html",
            "engine": engine || "request",
            "states": {
                "html": queueItem.url
            },
            "interfaces": [{
                "path": "/",
                "method": "get",
                "key": "download",
                "title": ""
            }]
        });

        /**
         * 调用接口
         */
        return this.proxy.proxy.execute("/download/download", proxyInfo || {}).then((res: request.RequestResponse) => {
            return {
                statusCode: res.statusCode,
                responseBody: res.body,
                crawlerCount: ~~queueItem.crawlerCount + 1
            };
        });
    }

    @Add("role:crawler.plugin.downloader,cmd:interface")

    inter({ url, path = "", params, data, header, method = "get", engine = "request" }: any) {
        /**
         * 添加接口信息
         */
        this.proxy.proxy.loadConfig({
            "key": "download",
            "title": "download下载接口",
            "state": "interface",
            "engine": engine,
            "states": {
                "interface": url
            },
            "interfaces": [{
                "path": path,
                "method": method,
                "key": "interface",
                "title": ""
            }]
        });

        console.log(1);

        /**
         * 调用接口
         */
        return this.proxy.proxy.execute("/download/interface", {
            data,
            params,
            settings: { header }
        }).then((res: request.RequestResponse) => {
            return {
                statusCode: res.statusCode,
                responseBody: res.body
            };
        });

    }

}