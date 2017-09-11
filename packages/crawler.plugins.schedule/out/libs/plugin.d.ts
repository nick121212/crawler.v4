import * as amqplib from "amqplib";
export interface IPlugin {
    partten: string;
    data: Object;
}
export declare class ExecutePluginService {
    preExecute(seneca: any, config: any, msg?: amqplib.Message): Promise<any>;
    /**
     * 执行插件列表
     * @param seneca
     * @param plugins
     * @param msg
     */
    execute(seneca: any, plugins: Array<any>, msg?: amqplib.Message): Promise<any>;
    /**
     * 检测当前配置的模式是否存在，不存在则报错
     * @param seneca   seneca实例
     * @param plugins  插件列表
     */
    private checkParttens(seneca, plugins);
    /**
    * 从message中提取queueItem数据
    * @param msg   消息
    */
    private getQueueItemFromMsg(msg);
    private getFieldFlow(queueItem, pages);
}
