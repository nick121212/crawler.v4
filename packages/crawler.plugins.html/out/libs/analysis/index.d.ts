import { Base } from "./base";
/**
 * 处理html文本策越
 */
export declare class Strategy extends Base {
    /**
     * 构造函数
     * 注册默认的解析策略
     */
    constructor();
    /**
     * 开始处理文本
     * @param queueItem      {Object}    数据
     * @param rule        {Object} 配置
     * @returns {Promise}
     */
    doDeal(queueItem: any, rule: any): Promise<any>;
}
declare const _default: Strategy;
export default _default;
