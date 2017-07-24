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
     * @returns Promise
     */
    doDeal(queueItem: any, data: any, results: any, $: any, index: number): Promise<any> {
        let promise = jsdom.doDeal(queueItem, data, $, index).then((res) => {
            let jData = jpp(results);
            let path: Array<string> = [];
            let idx = _.isUndefined(res.data.dataIndex) ? res.index : res.data.dataIndex;

            if (typeof idx === "number" && _.isArray(results)) {
                path.push(idx.toString());
            }

            if (path) {
                results = jData.get(jpp.compile(path));
            }
            results[data.key] = {};
            res.result = results[data.key];

            if (path) {
                res.index = null;
            }

            return res;
        });

        return promise;
    }
}

export default new Strategy();