import * as _ from "lodash";

/**
 * 处理html文本策越
 */
export class Strategy {
    /**
     * 转换成数字类型
     * @param reseult {Any}
     * @returns {String}
     */
    public doDeal(result: string, settings: { parse: boolean, func: Function }): any {
        let res = result;

        try {
            if (settings.parse) {
                res = JSON.parse(res);
            }
            if (_.isFunction(settings.func)) {
                res = settings.func.call(this, res);
            }
        } catch (e) {
            return {};
        }

        return res;
    }
}

export default new Strategy();
