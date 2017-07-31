import inversify, { injectable, inject } from 'inversify';
import * as Seneca from 'seneca';
import { Plugin, Add, Wrap, Init } from 'crawler.plugins.common';
import * as _ from "lodash";
import * as pathToRegexp from 'path-to-regexp';

import format from '../libs/format';
import analysis from '../libs/analysis';
import { pluginName } from "../constants";

@Plugin(pluginName)
@injectable()
export class HtmlPlugin {

    @Add(`role:${pluginName},cmd:html`)
    async html({ queueItem, pages }: { queueItem: any, pages: Array<any> }) {
        let urls = [];
        let results: Array<any> = [];

        let rules = _.filter(pages, ({ path }) => {
            let pathToReg = pathToRegexp(path.toString(), []);

            return pathToReg.test(queueItem.path);
        });

        // 解析规则，分析页面中的字段
        if (rules.length && queueItem.responseBody) {
            for (let rule of rules) {
                results.push((await analysis.doDeal(queueItem, rule)));
            }
        }

        return results;
    }

}