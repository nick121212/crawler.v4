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
    public doDeal(result: any, { join }: { join: string }) {
        try {
            return result.join(join || ",");
        } catch (e) {
            // return result;
        }

        return result;
    }
}

export default new Strategy();
