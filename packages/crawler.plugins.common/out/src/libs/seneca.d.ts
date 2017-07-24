/// <reference types="seneca" />
import * as OriginSeneca from 'seneca';
import * as inversify from 'inversify';
import { IAdd } from "./contansts/iadd";
export declare class Seneca {
    private _seneca;
    private _container;
    constructor(container: inversify.interfaces.Container, options?: OriginSeneca.Options);
    readonly seneca: any;
    /**
     * 包装act
     * @param 参数
     * target: 包装的方法所在的类
     * partten: act 的partten
     * key: 方法的名字
     * options: 额外参数
     */
    initAct(name: string, {target, partten, key, options}: IAdd, globalOptions: any): void;
    /**
     * 包装wrap
     * @param 参数
     * target: 包装的方法所在的类
     * partten: act 的partten
     * key: 方法的名字
     * options: 额外参数
     */
    initWrap(name: string, {target, partten, key, options}: IAdd, globalOptions: any): void;
    /**
     * 初始化插件
     */
    initPlugin(options?: any): void;
}
