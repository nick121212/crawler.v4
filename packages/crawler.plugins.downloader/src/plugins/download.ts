import inversify, { injectable, inject } from 'inversify';
import * as Seneca from 'seneca';
import * as request from 'request';

import { Plugin, Add, Wrap, Init } from 'crawler.plugins.common';
import { Proxy } from "../proxy";
import { pluginName } from "../constants";
// import * as bluebird from 'bluebird';

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
    async html({ queueItem, proxyInfo, save = true, header = {}, charset, engine = "superagent" }: { charset: string, save: boolean, header: any, queueItem: any, proxyInfo: any, engine: string }, options: any) {
        /**
         * 添加接口信息
         */
        this.proxy.proxy.loadConfig({
            "key": "download",
            "title": "download下载接口",
            "state": "html",
            "engine": engine,
            "states": {
                "html": queueItem.url
            },
            "interfaces": [{
                "path": "",
                "method": "get",
                "key": "download",
                "title": ""
            }]
        });
        /**
         * 调用接口
         */
        let res: request.RequestResponse = await this.proxy.proxy.execute("/download/download", {
            settings: {
                header,
                charset
            }
        })
        if (save) {
            let expireSeneca = options.seneca.delegate({ expire$: 15 });
            let download = expireSeneca.make$('downloads', {
                id: queueItem._id,
                data: res.statusCode,
                ...queueItem,
                responseBody: res.body
            });

            await download.saveAsync();
        }

        console.log(res.body);

        return {
            statusCode: res.statusCode,
            // responseBody: res.body,
            crawlerCount: ~~queueItem.crawlerCount + 1
        };
    }

    @Add(`role:${pluginName},cmd:interfaces`)
    inter({ url, path = "", params, data, header, method = "get", engine = "superagent", _id = "" }: any) {
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