/**
 * 处理html文本策越
 */
export declare class Strategy {
    /**
     * 转换成数字类型
     * @param reseult {Any}
     * @returns {String}
     */
    doDeal(result: string, settings: {
        parse: boolean;
        func: Function;
    }): any;
}
declare const _default: Strategy;
export default _default;
