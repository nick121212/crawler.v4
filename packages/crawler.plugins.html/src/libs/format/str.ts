import * as _ from "lodash";

/**
 * 处理html文本策越
 */
export class Strategy {
    /**
     * null转换"""
     * @param reseult {Any}
     * @returns {String}
     */
    public doDeal(result: any) {
        if (result === null || result === undefined) {
            return "";
        }

        return result;
    }
}

export default new Strategy();
