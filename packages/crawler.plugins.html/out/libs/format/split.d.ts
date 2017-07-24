export declare class Strategy {
    /**
     * 正则匹配数据
     * @returns {String}
     */
    doDeal(result: string, settings: {
        splitOf: string;
        start: number;
        end: number;
        join: string;
    }): Array<any> | string;
}
declare const _default: Strategy;
export default _default;
