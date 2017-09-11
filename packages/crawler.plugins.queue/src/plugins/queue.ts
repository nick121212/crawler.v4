import * as Seneca from "seneca";
import inversify, { injectable, inject } from "inversify";
import { Plugin, Add, Wrap, Init } from "crawler.plugins.common";
import * as _ from "lodash";

import { pluginName } from "../constants";
import { IQueueItem } from "../libs/queueitem";
import { DiscoverLinks } from "../libs/discover";
import { Queue } from "../libs/queue";

@Plugin(pluginName)
@injectable()
export class QueuePlugin {

    /**
     * 分析urls
     * @param param0 
     */
    @Add(`role:${pluginName},cmd:analyze`)
    private async getUrls({ queueItem, discoverConfig = {}, queueConfig = {} }: { queueItem: IQueueItem, discoverConfig: any, queueConfig: any }) {
        let discoverLink = new DiscoverLinks(discoverConfig);
        let queue = new Queue(queueConfig);
        let urls: Array<string> = await discoverLink.discoverResources(queueItem);
        let allowUrls: Array<any> = [];

        // url地址queue化
        urls.forEach((url: string) => {
            let q = queue.queueURL(url, queueItem || {});

            q && allowUrls.push(q);
        });

        return allowUrls;
    }

    /**
     * 地址规范化
     * @param param0 
     */
    @Add(`role:${pluginName},cmd:queue`)
    private async queueUrl({ urls, queueItem, queueConfig = {} }: any) {
        let queue = new Queue(queueConfig);

        return _.map(urls, (url: string) => {
            return queue.queueURL(url, queueItem);
        });
    }

}