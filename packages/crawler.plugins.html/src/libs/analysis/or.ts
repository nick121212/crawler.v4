import * as _ from "lodash";
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
     * 数组类型,直接返回空数组
     * @returns Promise
     */
    doDeal(queueItem: any, data: any, results: any, $: any, index: number): Promise<any> {

        if(data.key){
            _.each(data.data,(d)=>{
                d.key = data.key;
            });
        }

        let promises = this.doDealData(queueItem, data.data.concat([]), results, $, index);

        return Promise.all(promises).then((cases) => {
            let rtnResults: Array<any> = [];

            _.each(cases, (casee) => {
                if (casee.result) {
                    rtnResults.push(casee);
                    return false;
                }
            });
        });
    }
}

export default new Strategy();