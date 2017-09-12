import inversify, { injectable, inject } from "inversify";
import * as Seneca from "seneca";
import * as request from "request";
import { Plugin, Add, Wrap, Init } from "crawler.plugins.common";

import { Proxy } from "../proxy";
import { pluginName } from "../constants";

@Plugin(pluginName)
@injectable()
export class DownloadPlugin {
    @inject(Proxy)
    private proxy: Proxy;

    /**
     * 下载数据
     * @param param0
     */
    @Add(`role:${pluginName},cmd:html`)
    public async html(
        { queueItem, proxyInfo, save = true, header = {}, charset, engine = "superagent" }:
            { charset: string, save: boolean, header: any, queueItem: any, proxyInfo: any, engine: string }, options: any) {
        let start = Date.now();

        /**
         * 添加接口信息
         */
        this.proxy.proxy.loadConfig({
            "engine": engine,
            "interfaces": [{
                "key": "download",
                "method": "get",
                "path": "",
                "title": ""
            }],
            "key": "download",
            "state": "html",
            "states": {
                "html": queueItem.url
            },
            "title": "download下载接口",

        });
        /**
         * 调用接口
         */
        let res: request.RequestResponse = await this.proxy.proxy.execute("/download/download", {
            settings: {
                header,
                charset
            }
        });

        if (save) {
            let expireSeneca = options.seneca.delegate({ expire$: 60 });
            let download = expireSeneca.make$("downloads", {
                data: res.statusCode,
                id: queueItem._id,
                ...queueItem,
                responseBody: res.body
            });

            await download.saveAsync();
        }

        console.log(queueItem.url, "-----downloader 成功；耗时：", Date.now() - start, "ms");

        return {
            crawlerCount: 1 * queueItem.crawlerCount + 1,
            responseBody: save ? null : res.body,
            statusCode: res.statusCode,
        };
    }

    @Add(`role:${pluginName},cmd:interfaces`)
    public inter({ url, path = "", params, data, header, method = "get", engine = "superagent", _id = "" }: any) {
        /**
         * 添加接口信息
         */
        this.proxy.proxy.loadConfig({
            "engine": engine,
            "interfaces": [{
                "key": "interface",
                "method": method,
                "path": path,
                "title": ""
            }],
            "key": "download",
            "state": "interface",
            "states": {
                "interface": url
            },
            "title": "download下载接口",

        });
        /**
         * 调用接口
         */
        return this.proxy.proxy.execute("/download/interface", {
            data,
            params,
            settings: { header }
        }).then((res: request.RequestResponse) => {
            return {
                responseBody: res.body,
                statusCode: res.statusCode,
            };
        });
    }
}
