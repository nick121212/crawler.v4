import * as _ from "lodash";
import * as jpp from "json-pointer";
import { Base } from "./base";
import jsdom from "../html/jsdom";

export class Strategy extends Base {
    /**
     * 构造函数
     * 注册默认的解析策略
     */
    constructor() {
        super();
    }

    /**
     * 数组的情况下执行
     * @param queueItem {Object}  链接信息
     * @param data      {Object}  配置数据
     * @param results   {Object}  结果数据
     * @param $         {Object}  父jquery对象
     * @param index     {Number}  jquery索引
     * @returns Promise
     */
    public doDeal(queueItem: any, data: any, results: any, $: any, index: number): Promise<any> {
        let jData = jpp(results);
        let path: Array<string> = [];
        let idx = _.isUndefined(data.dataIndex) ? index : data.dataIndex;
        let resource: any;

        if (_.isNumber(idx) && _.isArray(results)) {
            path.push(idx.toString());
        }
        if (data.key) {
            path.push(data.key);
        }

        if (!jData.has(jpp.compile(path))) {
            jData.set(jpp.compile(path), []);
        }
        results = jData.get(jpp.compile(path));

        return jsdom.doDeal(queueItem, data, $, index).then((res) => {
            let promises: Array<any> = [];

            res.result = results;
            for (let i = 0, n = res.len; i < n; i++) {
                res.result.push({});
                promises = promises.concat(this.doDealData(queueItem, data.data ? data.data.concat([]) : [], res.result, res.$cur, i));
            }
            resource = res;

            return promises;
        }).then((promises) => {
            if (promises.length) {
                return Promise.all(promises).then((cases) => {
                    let rtnResults: Array<any> = [];

                    _.each(cases, (casee) => {
                        if (casee) {
                            rtnResults.push(casee);
                        }
                    });
                    return rtnResults;
                });
            }

            return resource;
        });
    }
}

export default new Strategy();
