import inversify, { injectable, inject } from "inversify";
import * as Seneca from "seneca";
import * as request from "request";
import { Plugin, Add, Wrap, Init, Validate } from "crawler.plugins.common";
import * as joi from "joi";

import { Proxy } from "../proxy";
import { pluginName } from "../constants";
import { htmlJoi, HtmlModel } from "../models/html";
import { interJoi, InterModel } from "../models/inter";

@Plugin(pluginName)
@injectable()
export class DownloadPlugin {
    @inject(Proxy)
    private proxy: Proxy;

    /**
     * get请求
     * @param param0
     */
    @Add(`role:${pluginName},cmd:html`)
    private async html( @Validate(htmlJoi, { allowUnknown: true })
    { queueItem, proxyInfo, header = {}, charset, engine = "superagent" }: HtmlModel) {
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
                charset,
                proxyInfo
            }
        });

        console.log(queueItem.url, "-----downloader 成功；耗时：", Date.now() - start, "ms");

        return {
            crawlerCount: 1 * (queueItem.crawlerCount || 0) + 1,
            header: res.headers,
            responseBody: res.body,
            statusCode: res.statusCode,
        };
    }

    /**
     * 调用接口
     * @param params 参数
     */
    @Add(`role:${pluginName},cmd:interfaces`)
    private async inter( @Validate(interJoi, { allowUnknown: true })
    { url, path = "", params, data, header, method = "get", engine = "superagent", charset = "utf-8" }: InterModel) {
        let start = Date.now();

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

        
console.log("-----------");
        /**
         * 调用接口
         */
        let rtn = await this.proxy.proxy.execute("/download/interface", {
            data,
            params,
            settings: { header, charset }
        }).then((res: request.RequestResponse) => {
            return {
                responseBody: res.body,
                header: res.headers,
                statusCode: res.statusCode,
            };
        });

        console.log(url, "-----downloader 成功；耗时：", Date.now() - start, "ms");

        return rtn;
    }
}
