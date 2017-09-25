/// <reference types="node" />
import { EventEmitter } from "events";
export interface IPlugin {
    pre: {
        [key: string]: any;
    };
    after: {
        [key: string]: any;
    };
}
export interface IConfig {
    plugins: IPlugin;
    options: any;
}
/**
 * 获取配置文件的信息
 */
export declare class Configurator extends EventEmitter {
    private automaticConfigReload;
    config: any;
    oldConfig: any;
    /**
     * 构造
     * @param automaticConfigReload 是否自动获取配置文件的更改
     */
    constructor(automaticConfigReload?: boolean);
    /**
     * 更新配置文件信息
     * @param file 文件的路径
     */
    updateConfig(file: string): void;
}
/**
 * 配置信息接口
 */
export interface IConfigService<T> {
    config: T;
}
/**
 * 读取配置文件服务
 *     redis
 *     mq
 */
export declare class ConfigService<T> extends Configurator implements IConfigService<T> {
    private configurator;
    constructor();
    /**
     * 初始化配置文件
     * @param filePath 配置文件路径
     * @param automaticConfigReload 自动重载
     */
    private initConfig(filePath, automaticConfigReload?);
    /**
     * 返回配置信息
     */
    readonly config: T;
}
