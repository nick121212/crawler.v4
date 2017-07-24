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
     * 普通的情况下执行
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
            if (data.key) {
                path.push(data.key);
            }
            res.result && jData.set(jpp.compile(path), this.doFormatData(res.result, data.formats));

            return res;
        });

        return promise;
    }
}

export default new Strategy();