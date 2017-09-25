import * as OriginSeneca from "seneca";
import * as bluebird from "bluebird";
import * as inversify from "inversify";
import { injectable, inject } from "inversify";
// import * as _ from "lodash";

import { SenecaConfig, Types } from "./contansts/config";
import { IPlugin } from "./decorator/plugin";
import { IAdd } from "./decorator/add";
import { IWrap } from "./decorator/wrap";
import { IInit } from "./decorator/init";
import { IConfigService, ConfigService } from "./config";
import { IConfig } from "./config";
import { PluginBase } from "../index";
import { MathPlugin } from "../demo/plugins/math";
import { IValidate } from "./decorator/validate";

@injectable()
export class Seneca<T extends IConfig> {
    private _seneca: OriginSeneca.Instance | any;
    private _container: inversify.interfaces.Container;

    private config: IConfigService<T>;

    /**
     * 构造
     * @param container ico容器
     * @param options   参数
     */
    constructor(container: inversify.interfaces.Container, options?: OriginSeneca.Options) {
        this._container = container;
        this.config = new ConfigService<T>();

        const { senecaOptions = {} } = this.config.config.options || {};

        this._seneca = OriginSeneca(Object.assign({}, options, senecaOptions));

        bluebird.promisifyAll(this._seneca);
        this._seneca.use("entity");
        // let originMake = this._seneca.private$.entity.make$;

        // 使得entity可以使用promise方法
        bluebird.promisifyAll(this._seneca.private$.entity.__proto__, {
            context: this._seneca.private$.entity,
            filter: (name: string, func: Function, target?: any) => {
                let names = name.split("");

                if (names.pop() === "$") {
                    target[names.join("") + "Async"] = bluebird.promisify(func);
                }

                return false;
            }
        });

        this.prePlugins();
    }

    /**
     * 获取当前的seneca实例
     */
    public get seneca() {
        return this._seneca;
    }

    /**
     * 载入插件
     */
    public prePlugins(): void {
        if (this.config && this.config.config && this.config.config.plugins) {
            for (let key in this.config.config.plugins.pre) {
                if (this.config.config.plugins.pre.hasOwnProperty(key)) {
                    let element = this.config.config.plugins.pre[key];

                    this._seneca.use(key, element || {});
                }
            }
            this.initPlugin(this.config.config.options || {});
            for (let key in this.config.config.plugins.after) {
                if (this.config.config.plugins.after.hasOwnProperty(key)) {
                    let element = this.config.config.plugins.after[key];

                    this._seneca.use(key, element || {});
                }
            }
        } else {
            this.initPlugin({});
        }
    }

    /**
     * 初始化插件
     */
    public initPlugin(options: { [key: string]: any } = {}): void {
        let plugins: Array<PluginBase>;

        try {
            plugins = this._container.getAll<PluginBase>(Types._plugin);
        } catch (e) {
            return;
        }

        if (plugins) {
            plugins.forEach((plugin: PluginBase) => {
                let pluginInfo: IPlugin = Reflect.getMetadata(SenecaConfig._plugin, plugin.constructor);
                let addList: Array<IAdd> = Reflect.getMetadata(SenecaConfig._add, plugin.constructor) || [];
                let wrapList: Array<IWrap> = Reflect.getMetadata(SenecaConfig._wrap, plugin.constructor) || [];
                let initList: Array<IAdd> = Reflect.getMetadata(SenecaConfig._init, plugin.constructor) || [];

                this._seneca.use(() => {
                    addList.forEach((add: IAdd) => this.initAct(this.executeValudate(plugin), add, options[pluginInfo.name]));
                    wrapList.forEach((wrap: IWrap) => this.initWrap(this.executeValudate(plugin), wrap, options[pluginInfo.name]));
                    initList.forEach((init: IInit) => this.initAct(this.executeValudate(plugin),
                        Object.assign({ partten: `init:${pluginInfo.name}` }, init, {}), options[pluginInfo.name]));

                    return pluginInfo.name;
                });
            });
        }
    }

    /**
     * 包装验证方法
     * @param plugin 插件
     */
    private executeValudate(plugin: any) {
        let validateList: Array<IValidate> = Reflect.getMetadata(SenecaConfig._validate, plugin.constructor) || [];


        if (validateList) {
            validateList.forEach((validate: IValidate) => {
                let originFun = plugin[validate.key];

                plugin[validate.key] = async (...args: Array<any>) => {
                    if (validate.joi) {
                        let result = validate.joi.validate(args[validate.index], validate.options);

                        if (result.error) {
                            throw result.error;
                        }
                    }

                    return await originFun.apply(plugin, args);
                };
            });
        }

        return plugin;
    }

    /**
     * 包装act
     * @param 参数
     * target:    包装的方法所在的类
     * partten:   act 的partten
     * key:       方法的名字
     * options:   额外参数
     */
    private initAct(plugin: any, { target, partten, key, options = {} }: IAdd, globalOptions: any) {
        // plugin = this.executeValudate(plugin);
        this._seneca.add(partten, options, async (msg: any, reply: any) => {
            try {
                let result = await plugin[key](msg, Object.assign({ seneca: reply.seneca }, options, {}), globalOptions);

                if (reply) {
                    reply(null, result);
                }
            } catch (e) {
                if (reply) {
                    reply(e);
                }
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
    private initWrap(plugin: any, { target, partten, key, options = {} }: IWrap, globalOptions: Object) {
        // plugin = this.executeValudate(plugin);
        this._seneca.wrap(partten, options, async (msg: Object, reply: any) => {
            try {
                let result = await plugin[key](msg, Object.assign({ seneca: reply.seneca }, options, {}), globalOptions);

                reply.seneca.prior(msg, reply);
            } catch (e) {
                if (reply) {
                    reply(e);
                }
            }
        });
    }
}
