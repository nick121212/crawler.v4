/**
 * 处理html文本策越
 */
export declare class Strategy {
    /**
     * 正则匹配数据
     * @returns {String}
     */
    doDeal(result: string, data: {
        regexp: string;
        scope: string;
        index: number;
    }): any;
}
declare const _default: Strategy;
export default _default;
