import * as amqplib from 'amqplib';
export interface IPlugin {
    partten: string;
    data: Object;
}
export declare class ExecutePluginService {
    /**
     * 检测当前配置的模式是否存在，不存在则报错
     * @param seneca
     * @param plugins
     */
    checkParttens(seneca: any, plugins: Array<IPlugin>): boolean;
    /**
     * 从message中提取queueItem数据
     * @param msg
     */
    getQueueItemFromMsg(msg?: amqplib.Message): any;
    /**
     * 执行插件列表
     * @param seneca
     * @param plugins
     * @param msg
     */
    execute(seneca: any, plugins: Array<any>, msg?: amqplib.Message): Promise<any>;
}
