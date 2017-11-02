import inversify, { injectable, inject } from "inversify";
import { Plugin, Add, Wrap, Init } from "crawler.plugins.common";
import * as bluebird from "bluebird";
import * as _ from "lodash";
import * as Moment from "moment";
import * as pinyin from "pinyin";

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

    private async getCategory(api: string, category: string, parent = 0) {
        let categories = await this.wpApi[api]().search(category);

        if (categories.length) {
            return categories[0];
        }

        let newCategory = await this.wpApi[api]().create({
            name: _.trim(category),
        });

        return newCategory;
    }

    private async getUser(api: string, data: any) {
        let users = await this.wpApi[api]().search(data.name);

        if (users.length) {
            return users[0];
        }

        return await this.wpApi.users().create({
            ...data
        });
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

        console.log("---------tag结束", tag.id, category.id);
        console.log("---------title", _.trim(resouce.title));

        let postExist = await this.wpApi["dwqa-question"]().slug(config._id).get();
        if (postExist.length) {
            return;
            // await this.wpApi["dwqa-question"]().id(postExist[0].id).delete();
        }
        console.log("---------删除post结束");

        await bluebird.delay(500);

        // this.wpApi["dwqa-question"]
        let post: any = await this.wpApi["dwqa-question"]().create({
            title: resouce.title,
            author: Math.floor(Math.random() * 2500) + 15, //15-701,
            comment_status: "open",
            "dwqa-question_category": category ? [category.id] : null,
            "dwqa-question_tag": tag ? [tag.id] : null,
            slug: config._id,
            content: resouce.content,
            status: "publish",
            date: Moment().add(comments.length * 3 - 30, "day").format("YYYY-MM-DD hh:mm:ss"),
            ping_status: "open"
        });
        console.log("--------post结束");

        let promisese: Promise<any>[] = [];

        comments.forEach(async (comment: any, idx: number) => {
            promisese.push(this.wpApi["dwqa-answer"]().create({
                title: resouce.title,
                post: post.id,
                menu_order: 2,
                author: Math.floor(Math.random() * 2500) + 15, //15-701,
                slug: config._id + "dwqa-answer" + idx,
                status: "publish",
                comment_status: "open",
                content: comment.content,
                date: Moment().add(-idx * 10, "hour").format("YYYY-MM-DD hh:mm:ss"),
                ping_status: "open"
            }));
        });

        await promisese;

        console.log("---------component结束");
    }

    @Add(`role:${pluginName},cmd:user`)
    private async user(config: { names: Array<string> }, options: any) {
        while (config.names.length) {
            let element: string = config.names.pop() as string;

            if (element) {
                try {
                    await this.wpApi.users().create({
                        name: element,
                        nickname: element,
                        username: element,
                        password: "111111",
                        email: `${pinyin(element, {
                            style: pinyin.STYLE_FIRST_LETTER,
                            heteronym: false
                        }).join("")}@bebewiki.com`
                    });
                } catch (e) {
                    console.log(e, `${pinyin(element, {
                        style: pinyin.STYLE_FIRST_LETTER,
                        heteronym: false
                    }).join("")}@bebewiki.com`);
                }
            }

        }
    }

    @Add(`role:${pluginName},cmd:ct`)
    private async ct(config: any, options: any) {
        let result = await options.seneca.actAsync("role:crawler.plugin.store.es,cmd:scroll", {
            esIndex: "youlai", esType: "dise"
        });
        let next = await options.seneca.actAsync("role:crawler.plugin.store.es,cmd:scroll", {
            esIndex: "youlai", esType: "dise", scrollId: result._scroll_id
        });
        let hits = result.hits.hits.concat(next.hits.hits);

        let categories: Array<any> = _.map(hits, (h: any) => {
            return h._source.result.categories;
        }).join(",").split(",");
        let tags = _.map(hits, (h: any) => {
            return h._source.result.tags.map((tag: string) => {
                return {
                    tag,
                    category: h._source.result.parent.name,
                    dises: h._source.result.dises
                };
            });
        });
        let disess: any[] = [];
        let dises = tags.map(([tag]) => {
            disess = disess.concat(tag.dises)
            return tag.dises;
        });

        // categories = await Promise.all(_.union(categories).map(async (cate: string) => {
        //     return await this.getCategory("dwkb_category", cate);
        // }));

        // let categoriesMap = _.keyBy(categories, "name");

        // let tagsMap = _.keyBy(await Promise.all(tags.map(([tag]) => {
        //     return this.getCategory("dwkb_category", tag.tag, categoriesMap[tag.category] ? categoriesMap[tag.category].id : 0);
        // })), "name");

        console.log(disess.length);

        while (disess.length) {
            let dise = disess.pop();

            await this.getCategory("dwkb_tag", dise.name);
        }

        console.log("导入完成");
        // console.log(tagsMap);


        // Promise.all(categories).then((categories) => {
        //     // console.log(categories, tags);
        // });


    }

    @Add(`role:${pluginName},cmd:yl`)
    private async youlai(config: any, options: any) {
        let oroginData = config._source;

        if (!oroginData.content) return;

        let user = await this.getUser("users", {
            name: oroginData.author,
            password: "111111",
            nickname: oroginData.author,
            username: oroginData.author,
            email: `${pinyin(oroginData.author, {
                style: pinyin.STYLE_FIRST_LETTER,
                heteronym: false
            }).join("")}@bebewiki.com`
        });
        let categories = [...(_.isArray(oroginData.categories) ? oroginData.categories : [oroginData.categories]), oroginData.tags[0]];
        let tags = [oroginData.tags[1]];

        categories = await Promise.all(categories.map(async (cate: string) => {
            return await this.getCategory("dwkb_category", cate);
        }));
        tags = await Promise.all(tags.map(async (tag: string) => {
            return await this.getCategory("dwkb_tag", tag);
        }));
        let post: any = await this.wpApi.dwkb().create({
            title: oroginData.title,
            content: oroginData.content,
            status: "publish",
            date: Moment(oroginData.createAt).format("YYYY-MM-DD hh:mm:ss"),
            meta: {
                dwkb_post_views_count: oroginData.num ? oroginData.num * 1 : 0
            },
            dwkb_category: categories.map((cate: any) => {
                return cate.id;
            }),
            dwkb_tag: tags.map((tag: any) => {
                return tag.id;
            }),
            author: user.id
        });
        console.log(post.id, user.id);

        return post;
    }

    @Init()
    private async init(msg: any, options: any, globalOptions: any) {
        this.wpApi = await WpApi.discover("https://www.bebewiki.com").then((site: any) => {
            return site.auth({
                username: "crawler",
                password: "crawler-1314"
            });
        });

        // this.wpApi = new WpApi({
        //     endpoint: "https://localhost/wp-json",
        //     username: "crawler",
        //     password: "crawler-1314"
        // });

        await bluebird.delay(10);
    }
}
