import * as Seneca from 'seneca';
import inversify, { injectable, inject } from 'inversify';
import { Plugin, Add, Wrap, Init } from 'crawler.common';

import { pluginName } from "../constants";
import { IQueueItem } from "../libs/queueitem";
import { DiscoverLinks } from "../libs/discover";
import { Queue } from "../libs/queue";

@Plugin(pluginName)
@injectable()
export class QueuePlugin {

     @Add(`role:${pluginName},cmd:analyze`)
    async getUrls({ queueItem, discoverConfig, queueConfig }: { queueItem: IQueueItem, discoverConfig: any, queueConfig: any }) {
        let discoverLink = new DiscoverLinks(discoverConfig || {});
        let queue = new Queue(queueConfig || {});
        let urls: Array<string> = await discoverLink.discoverResources(queueItem);
        let allowUrls: Array<any> = [];

        // url地址queue化
        urls.forEach((url: string) => {
            let q = queue.queueURL(url, queueItem || {});

            q && allowUrls.push(q);
        });

        return allowUrls;
    }

}