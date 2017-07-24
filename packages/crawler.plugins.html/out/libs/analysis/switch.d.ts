import { Base } from "./base";
export declare class Strategy extends Base {
    /**
     * 构造函数
     * 注册默认的解析策略
     */
    constructor();
    /**
     * 数组类型,直接返回空数组
     * @returns Promise
     */
    doDeal(queueItem: any, data: any, results: any, $: any, index: number): Promise<any>;
}
declare const _default: Strategy;
export default _default;
