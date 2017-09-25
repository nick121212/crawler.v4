/// <reference types="seneca" />
import * as OriginSeneca from "seneca";
import * as inversify from "inversify";
import { IConfig } from "./config";
export declare class Seneca<T extends IConfig> {
    private _seneca;
    private _container;
    private config;
    /**
     * 构造
     * @param container ico容器
     * @param options   参数
     */
    constructor(container: inversify.interfaces.Container, options?: OriginSeneca.Options);
    /**
     * 获取当前的seneca实例
     */
    readonly seneca: any;
    /**
     * 载入插件
     */
    prePlugins(): void;
    /**
     * 初始化插件
     */
    initPlugin(options?: {
        [key: string]: any;
    }): void;
    /**
     * 包装验证方法
     * @param plugin 插件
     */
    private executeValudate(plugin);
    /**
     * 包装act
     * @param 参数
     * target:    包装的方法所在的类
     * partten:   act 的partten
     * key:       方法的名字
     * options:   额外参数
     */
    private initAct(plugin, {target, partten, key, options}, globalOptions);
    /**
     * 包装wrap
     * @param 参数
     * target: 包装的方法所在的类
     * partten: act 的partten
     * key: 方法的名字
     * options: 额外参数
     */
    private initWrap(plugin, {target, partten, key, options}, globalOptions);
}
