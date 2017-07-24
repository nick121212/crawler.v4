/**
 * string值处理
 */
export declare class Strategy {
    /**
     * 开始处理文本,去掉左右空格,去掉中间空格,去掉制表符
     * @param result      {String} dom节点的值
     * @returns {String}
     */
    doDeal(result: string, settings: {
        start: boolean;
        end: boolean;
        middle: boolean;
    }): string;
}
declare const _default: Strategy;
export default _default;
