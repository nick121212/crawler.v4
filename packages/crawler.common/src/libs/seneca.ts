import * as OriginSeneca from 'seneca';
import * as bluebird from 'bluebird';
import * as inversify from 'inversify';

import { SenecaConfig, Types } from "./contansts/config";
import { IPlugin } from "./contansts/iplugin";
import { IAdd } from "./contansts/iadd";
import { IInit } from './contansts/iinit';

export class Seneca {
    private _seneca: OriginSeneca.Instance | any;
    private _container: inversify.interfaces.Container;

    constructor(container: inversify.interfaces.Container, options?: OriginSeneca.Options) {
        this._container = container;
        this._seneca = OriginSeneca(options);

        bluebird.promisifyAll(this._seneca);
    }

    public get seneca() {
        return this._seneca;
    }

    /**
     * 包装act
     * @param 参数
     * target: 包装的方法所在的类
     * partten: act 的partten
     * key: 方法的名字
     * options: 额外参数 
     */
    initAct(name: string, { target, partten, key, options = {} }: IAdd, globalOptions: any) {
        this._seneca.add(partten, options, async (msg: Object, reply: Function) => {
            try {
                let result = await (this._container.getNamed(Types._plugin, name) as any)[key](msg, options, globalOptions);

                reply(null, result);
            } catch (e) {
                reply(e);
            }
        });
    }

    /**
     * 包装wrap
     * @param 参数
     * target: 包装的方法所在的类
     * partten: act 的partten
     * key: 方法的名字
     * options: 额外参数 
     */
    initWrap(name: string, { target, partten, key, options = {} }: IAdd, globalOptions: any) {
        this._seneca.wrap(partten, options, async (msg: Object, reply: any) => {
            try {
                let result = await (this._container.getNamed(Types._plugin, name) as any)[key](msg, options, globalOptions);

                reply.seneca.prior(msg, reply);
            } catch (e) {
                reply(e);
            }
        });
    }

    /**
     * 初始化插件
     */
    initPlugin(options: any = {}) {
        const plugins: Array<IPlugin> = this._container.getAll<IPlugin>(Types._plugin);

        if (!plugins) {
            return;
        }

        plugins.forEach((plugin: IPlugin) => {
            let pluginInfo: IPlugin = Reflect.getMetadata(SenecaConfig._plugin, plugin.constructor);
            let addList: Array<IAdd> = Reflect.getMetadata(SenecaConfig._add, plugin.constructor) || [];
            let wrapList: Array<IAdd> = Reflect.getMetadata(SenecaConfig._wrap, plugin.constructor) || [];
            let initList: Array<IAdd> = Reflect.getMetadata(SenecaConfig._init, plugin.constructor) || [];

            this._seneca.use(() => {
                addList.forEach((add: IAdd) => this.initAct(plugin.name, add, options[pluginInfo.name]));
                wrapList.forEach((wrap: IAdd) => this.initWrap(plugin.name, wrap, options[pluginInfo.name]));
                initList.forEach((init: IInit) => this.initAct(plugin.name, Object.assign({ partten: `init:${pluginInfo.name}` }, init, {}), options[pluginInfo.name]));

                return pluginInfo.name;
            });
        });
    }
}