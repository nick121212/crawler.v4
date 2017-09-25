import inversify, { injectable, inject } from "inversify";
import * as Seneca from "seneca";
import * as _ from "lodash";
import * as pathToRegexp from "path-to-regexp";
import { Plugin, Add, Wrap, Init, Validate } from "crawler.plugins.common";
import * as joi from "joi";

import analysis from "../libs/analysis";
import { pluginName } from "../constants";

// const Pool = require("threads").Pool;
// const pool = new Pool();


@Plugin(pluginName)
@injectable()
export class HtmlPlugin {
    @Add(`role:${pluginName},cmd:html`)
    private async html( @Validate(joi.object().keys({
        queueItem: joi.object().keys({
            path: joi.string().required().label("路径")
        }).required(),
        pages: joi.array().required().min(1).items(joi.object().keys({
            path: joi.string().required()
        }))
    }), { allowUnknown: true }) { queueItem = {}, pages = [] }: { queueItem: any, pages: Array<any> }, options: any) {
        if (!queueItem) {
            return [];
        }
        let start = Date.now();

        let urls = [];
        let results: Array<any> = [];
        let rules = _.filter(pages, ({ path }) => {
            let pathToReg = pathToRegexp(path.toString(), []);

            return pathToReg.test(queueItem.path);
        });

        // if (rules.length && !queueItem.responseBody) {
        //     let expireSeneca = options.seneca.delegate({ expire$: 60 });
        //     let entity = expireSeneca.make("downloads");
        //     let download = await entity.loadAsync({ id: queueItem._id });
        //     if (download) {
        //         queueItem.responseBody = download.responseBody;
        //     }
        // }

        // 解析规则，分析页面中的字段
        if (rules.length && queueItem.responseBody) {
            for (let rule of rules) {
                results.push(await analysis.doDeal(queueItem, rule));
            }
        }

        console.log(queueItem.url, "耗时：", Date.now() - start);

        return results;
    }
}
