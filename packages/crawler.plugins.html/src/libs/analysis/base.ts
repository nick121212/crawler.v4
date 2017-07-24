import * as _ from "lodash";

import dataDeal from "../format";

export class Base {
    protected deals: any = {};

    /**
     * 处理data数据
     * @param queueItem  {Object}
     * @param data       {Object}
     * @param curResults {Object}
     * @param $          {Object}
     * @param index      {Number}
     * @return {Array<Promise>}
     */
    doDealData(queueItem: any, data: any, results: any, $: any, index: number): Array<Promise<any>> {
        let promises: Array<any> = [];
        let strategy: { doDeal: (queueItem: any, data: any, results: any, $: any, index: number) => Promise<any> };

        data = data.concat([]);
        _.each(data, (d) => {
            strategy = this.deals[d.dealStrategy] || this.deals.normal;

            if (!strategy) {
                throw new Error(`没有找到${d.dealStrategy}的分析器！`);
            } else {
                promises.push(strategy.doDeal(queueItem, d, results, $, index));
            }
        });

        return promises;
    }

    /**
     * 数据的格式化函数
     * @param result  {String}
     * @param formats {Array<Object>}
     * @return {String|Number}
     */
    public doFormatData(result: any, formats: Array<{ key: string, settings: Object }>): any {
        let res = result;

        _.each(formats, (format) => {
            res = dataDeal.doDeal(format.key, res, format.settings);
        });

        return res;
    }
}