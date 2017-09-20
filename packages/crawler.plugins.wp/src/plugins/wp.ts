import inversify, { injectable, inject } from "inversify";
import { Plugin, Add, Wrap, Init } from "crawler.plugins.common";
import * as bluebird from "bluebird";
import * as _ from "lodash";

import { pluginName } from "../constants";

const WpApi = require("wpapi");

const settings = {
    "pages": [{
        "key": "blog-detail",
        "path": "*",
        "areas": [],
        "fieldKey": "",
        "fields": {
            "none": {
                "data": [{
                    "key": "content",
                    "selector": [".blog-content"],
                    "removeSelector": ["meta", ".comment-bar", "#question_id", "hr:eq(-1) ~ *"],
                    "methodInfo": { "html": [] },
                    "dealStrategy": "normal"
                }]
            }
        },
        "enabled": true
    }]
};


@Plugin(pluginName)
@injectable()
export class WpPlugin {

    private wpApi: any;

    @Add(`role:${pluginName},cmd:blog`)
    public async blog(config: { esIndex: string; esType: string; _id: any; }, options: any) {
        let result = null;
        let resouce: any, promises: Array<Promise<any>> = [];

        try {
            result = await options.seneca.actAsync("role:crawler.plugin.store.es,cmd:getItem", config);
            if (result.found) {
                resouce = result._source;
            } else {
                return {};
            }
        } catch (e) {
            try {
                if (e.statusCode == "404") {
                    config.esType = "mamilove.blog";
                    result = await options.seneca.actAsync("role:crawler.plugin.store.es,cmd:getItem", config);
                    if (result.found) {
                        resouce = result._source;
                    } else {
                        return;
                    }
                }
            } catch (e) {
                return;
            }
        }

        if (!resouce) {
            return;
        }

        if (!resouce.categories) {
            resouce.categories = [];
        }

        let neRresouce = await options.seneca.actAsync("role:crawler.plugin.html,cmd:html", Object.assign({}, settings, {
            queueItem: {
                url: "/",
                responseBody: resouce.content
            }
        }));

        if (neRresouce.length) {
            resouce.content = neRresouce[0].result.content;
        }

        // 处理category
        resouce.categories.forEach(async (category: string) => {
            promises.push(this.wpApi.categories().search(_.trim(category)).then((categoryInfo: Array<any>) => {
                if (categoryInfo.length) {
                    return categoryInfo.pop().id;
                }
                return this.wpApi.categories().auth({
                    username: "crawler",
                    password: "crawler-1314"
                }).create({ name: _.trim(category) }, (data: any) => {
                    console.log(data);
                }).then((data: any) => {
                    if (!data) {
                        return 0;
                    }
                    return data.id;
                });
            }));
        });

        let categories = await Promise.all(promises);

        let post: any = await this.wpApi.posts().create({
            title: resouce.title,
            content: resouce.content,
            status: "publish",
            categories: categories,
            auther: 5
        });

        return post;
    }

    @Add(`role:${pluginName},cmd:qa`)
    public async html(config: { esIndex: string; esType: string; _id: any; }, options: any) {
        let aaa = await this.wpApi.taxonomies().param("type", "dwkb_category").get();

        console.log(aaa);
    }

    @Init()
    public async init(msg: any, options: any, globalOptions: any) {
        this.wpApi = await WpApi.discover("https://www.bebewiki.com").then((site: any) => {
            return site.auth({
                username: "crawler",
                password: "crawler-1314"
            });
        });

        await bluebird.delay(10);
    }
}
