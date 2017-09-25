import * as _ from "lodash";

/**
 * string值处理
 */
export class Strategy {
    /**
     * 开始处理文本,去掉左右空格,去掉中间空格,去掉制表符
     * @param result      {String} dom节点的值
     * @returns {String}
     */
    public doDeal(result: string, settings: { start: boolean, end: boolean, middle: boolean }): string {
        if (_.isString(result)) {
            if (settings.start) {
                result = _.trimStart(result);
            }
            if (settings.end) {
                result = _.trimEnd(result);
            }
            if (settings.middle) {
                result = result.replace(/\r\n/gi, "");
            }
        }

        return result;
    }
}

export default new Strategy();
