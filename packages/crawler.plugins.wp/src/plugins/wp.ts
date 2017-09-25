import inversify, { injectable, inject } from "inversify";
import { Plugin, Add, Wrap, Init } from "crawler.plugins.common";
import * as bluebird from "bluebird";
import * as _ from "lodash";
import * as Moment from "moment";

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
    private async blog(config: { esIndex: string; esType: string; _id: any; }, options: any) {
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
                if (e.statusCode.toString() === "404") {
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

    private async getCategory(api: string, category: string) {
        let categories = await this.wpApi[api]().search(category);

        if (categories.length) {
            return categories[0];
        }

        let newCategory = await this.wpApi[api]().create({
            name: _.trim(category)
        });

        return newCategory;
    }

    @Add(`role:${pluginName},cmd:qa`)
    private async qa(config: { _source: string; _id: string }, options: any) {
        let resouce: any = config._source, promises: Array<Promise<any>> = [];
        let comments = resouce.comments || [];
        let category, tag;

        // console.log("开始导入wp的qa数据-------------", resouce);
        if (resouce.category) {
            category = await this.getCategory("dwqa-question_category", resouce.category);

            if (!category) {
                throw new Error("没有category");
            }
        }

        if (resouce.age) {
            tag = await this.getCategory("dwqa-question_tag", resouce.age);
            if (!tag) {
                throw new Error("没有tag");
            }
        }

        console.log("tag结束", tag.id, category.id);

        let postData = {
            title: _.trim(resouce.title),
            author: 5,
            comment_status: "open",
            "dwqa-question_category": category ? [category.id] : null,
            "dwqa-question_tag": tag ? [tag.id] : null,
            slug: config._id,
            content: _.trim(resouce.content),
            status: "publish",
            date: Moment().add(comments.length * 3 - 30, "day").format("YYYY-MM-DD hh:mm:ss"),
            ping_status: "open"
        };

        console.log("创建post");

        let postExist = await this.wpApi["dwqa-question"]().slug(config._id).get();

        if (postExist.length) {
            await this.wpApi["dwqa-question"]().id(postExist[0].id).delete();
        }

        console.log("删除post结束", postExist);

        let post: any = await this.wpApi["dwqa-question"]().create(postData).catch((err: Error) => {
            throw err;
        });

        console.log("post结束");

        comments.forEach(async (comment: any, idx: number) => {
            let com = await this.wpApi["dwqa-answer"]().create({
                title: resouce.title,
                post: post.id,
                test: 1,
                menu_order: 2,
                author: 4,
                slug: config._id + "dwqa-answer" + idx,
                status: "publish",
                comment_status: "open",
                content: comment.content,
                date: Moment().add(idx * 10, "hour").format("YYYY-MM-DD hh:mm:ss"),
                ping_status: "open"
            }).catch(console.log);
        });

        console.log("component结束");
    }

    @Init()
    private async init(msg: any, options: any, globalOptions: any) {
        this.wpApi = await WpApi.discover("https://www.bebewiki.com").then((site: any) => {
            return site.auth({
                username: "crawler",
                password: "crawler-1314"
            });
        });

        await bluebird.delay(10);
    }
}
