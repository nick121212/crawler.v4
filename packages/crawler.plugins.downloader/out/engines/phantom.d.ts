import { modelProxy, IInterfaceModel, IExecute } from "modelproxy";
export declare class PhantomEngine extends modelProxy.BaseEngine {
    engineName: string;
    /**
     * 构造
     */
    constructor();
    /**
     * 初始化中间件
     */
    init(): void;
    /**
     * 调用接口
     * @param instance 接口的实例
     * @param options  参数
     */
    proxy(instance: IInterfaceModel, options: IExecute): Promise<any>;
    private house(url, headers, proxyInfo);
}
