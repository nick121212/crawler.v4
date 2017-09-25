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
    public doDeal(queueItem: any, data: any, results: any, $: any, index: number): Promise<any> {
        let promise = jsdom.doDeal(queueItem, data, $, index).then((res) => {
            if (!res.result || res.result.indexOf(res.data.match) < 0) {
                res = null;
            } else {
                res.result = results;
                res.$cur = res.$parent;
            }

            return res;
        });

        return promise;
    }
}

export default new Strategy();
