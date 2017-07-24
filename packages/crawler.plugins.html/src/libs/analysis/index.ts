import * as _ from "lodash";
import { Base } from "./base";
import jsdom from "../html/jsdom";
import * as requireDir from 'require-directory';

/**
 * 处理html文本策越
 */

export class Strategy extends Base {
    /**
     * 构造函数
     * 注册默认的解析策略
     */
    constructor() {
        super();

        _.each(requireDir(module, "./"), (deal: any, key: string) => {
            key !== "base" && (this.deals[key] = deal.default);
        });

        _.forEach(this.deals, (deal, key: string) => {
            deal && (deal.deals = this.deals);
        })
    }

    /**
     * 开始处理文本
     * @param queueItem      {Object}    数据
     * @param rule        {Object} 配置
     * @returns {Promise}
     */
    doDeal(queueItem:any, rule:any) {
        let promiseAll:any = [];
        let dataResults = {};
        let check = (results:any) => {
            let promises:any = [];
            let getPromises = (results:any) => {
                _.forEach(results, (result) => {
                    if (_.isArray(result)) {
                        getPromises(result);
                    } else {
                        result && result.data && result.data.data && (promises = promises.concat(this.doDealData.call(this, queueItem, result.data.data, result.result, result.$cur, result.index)));
                    }
                });
            };
            getPromises(results);

            return promises.length ? Promise.all(promises).then(check.bind(this)) : {
                result: dataResults,
                rule: rule
            };
            // return promises.length ? Promise.all(promises).then(check) : dataResults;
        };

        // 处理area
        return this.deals.area.doDeal(queueItem, rule.areas).then((results:any) => {
            _.forEach(rule.fields, (field, key) => {
                promiseAll = promiseAll.concat(this.doDealData.call(this, queueItem, field.data, dataResults, results[key] ? results[key].$cur : null));
            });

            return Promise.all(promiseAll).then(check.bind(this));
        });
    }
}

export default new Strategy();