import * as _ from "lodash";
import jsdom from "../html/jsdom";

export class Strategy {
    /**
     * 数组类型,直接返回空数组
     * @param queueItem {Object}
     * @param areas {Object}
     * @returns Promise
     */
    doDeal(queueItem: any, areas: Array<any>): Promise<any> {
        let promises: Array<any> = [];

        // 遍历
        _.each(areas, (area, key) => {
            promises.push(jsdom.doDeal(queueItem, area));
        });

        // 执行
        return Promise.all(promises).then((results) => {
            return _.keyBy(results, (res) => {
                if (res && res.data) {
                    return res.data.key;
                }
                return Date.now();
            });
        });
    }
}

export default new Strategy();