import * as OriginSeneca from 'seneca';
import * as bluebird from 'bluebird';
import * as inversify from 'inversify';
import { injectable, inject } from 'inversify';
// import * as _ from 'lodash';

import { SenecaConfig, Types } from "./contansts/config";
import { IPlugin } from "./contansts/iplugin";
import { IAdd } from "./contansts/iadd";
import { IInit } from './contansts/iinit';
import { IConfigService, ConfigService } from './config';
import { IConfig } from './contansts/iconfig';

@injectable()
export class Seneca<T extends IConfig> {
    private _seneca: OriginSeneca.Instance | any;
    private _container: inversify.interfaces.Container;

    private config: IConfigService<T>;

    constructor(container: inversify.interfaces.Container, options?: OriginSeneca.Options) {
        this._container = container;
        this._seneca = OriginSeneca(options);

        this.config = new ConfigService<T>();
        bluebird.promisifyAll(this._seneca);
        this._seneca.use("entity");
        let originMake = this._seneca.private$.entity.make$;

        // 使得entity可以使用promise方法
        bluebird.promisifyAll(this._seneca.private$.entity.__proto__, {
            context: this._seneca.private$.entity,
            filter: (name: string, func: Function, target?: any) => {
                let names = name.split('');

                if (names.pop() === "$") {
                    target[names.join("") + "Async"] = bluebird.promisify(func, { context: this._seneca.private$.entity });
                }

                return false;
            }
        });

        this.prePlugins();
        // this.config.
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
        this._seneca.add(partten, options, async (msg: Object, reply: any) => {
            try {
                let result = await (this._container.getNamed(Types._plugin, name) as any)[key](msg, Object.assign({ seneca: reply.seneca }, options, {}), globalOptions);

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
    initWrap(name: string, { target, partten, key, options = {} }: IAdd, globalOptions: Object) {
        this._seneca.wrap(partten, options, async (msg: Object, reply: any) => {
            try {
                let result = await (this._container.getNamed(Types._plugin, name) as any)[key](msg, Object.assign({ seneca: reply.seneca }, options, {}), globalOptions);

                reply.seneca.prior(msg, reply);
            } catch (e) {
                reply(e);
            }
        });
    }

    prePlugins(): void {
        if (this.config.config) {
            for (let key in this.config.config.plugins.pre) {
                if (this.config.config.plugins.pre.hasOwnProperty(key)) {
                    let element = this.config.config.plugins.pre[key];

                    this._seneca.use(key, element || {});
                }
            }

            for (let key in this.config.config.plugins.after) {
                if (this.config.config.plugins.after.hasOwnProperty(key)) {
                    let element = this.config.config.plugins.after[key];

                    this._seneca.use(key, element || {});
                }
            }
        }
    }

    /**
     * 初始化插件
     */
    initPlugin(options: { [key: string]: any } = {}): void {
        const plugins: Array<IPlugin> = this._container.getAll<IPlugin>(Types._plugin);

        if (plugins) {
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
}