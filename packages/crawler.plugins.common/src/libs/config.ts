import { injectable } from 'inversify';
import * as fs from "fs";
import * as util from "util";
import { EventEmitter } from "events";
import * as path from 'path';

export interface IPlugin {
    pre: {
        [key: string]: any;
    },
    after: {
        [key: string]: any;
    }
}

export interface IConfig {
    plugins: IPlugin;
    options: any;
}

/**
 * 获取配置文件的信息
 */
export class Configurator extends EventEmitter {
    public config: any;
    public oldConfig: any;

    /**
     * 构造
     * @param automaticConfigReload 是否自动获取配置文件的更改
     */
    constructor(private automaticConfigReload: boolean = false) {
        super();
    }

    /**
     * 更新配置文件信息
     * @param file 文件的路径
     */
    updateConfig(file: string) {
        let filePath = path.resolve(file);
        let config: any;

        try {
            config = require(filePath);
        } catch (e) {
            console.log("配置文件加载失败", e.message);
        }

        fs.watch(file, (event, filename) => {
            if (event == 'change' && this.automaticConfigReload) {
                this.updateConfig(filename);
                this.emit("cofigFileChange");
            }
        });

        this.oldConfig = this.config;
        this.config = config;

        this.emit("configfilecomplete");
    }
}

/**
 * 配置信息接口
 */
export interface IConfigService<T> {
    // initConfig: (filePath: string, automaticConfigReload: boolean) => void | any;
    config: T;
}

/**
 * 读取配置文件服务
 *     redis
 *     mq          
 */
@injectable()
export class ConfigService<T> extends Configurator implements IConfigService<T> {
    private configurator: Configurator;

    constructor() {
        super();

        if (process.env.CONFIG_PATH) {
            return this.initConfig(process.env.CONFIG_PATH as string);
        }

        if (process.argv.length < 2 && !process.argv[2]) {
            // $log.error("没有定义config文件!");
            // process.exit(1);
        } else {
            // 配置文件载入
            this.initConfig(process.argv[2]);
        }
    }

    /**
     * 初始化配置文件
     * @param filePath 配置文件路径
     * @param automaticConfigReload 
     */
    private initConfig(filePath: string, automaticConfigReload: boolean = false): void | any {
        // if (!fs.existsSync(filePath)) {
        //     return;
        //     // throw new Error(`${filePath}不存在！`);
        // }
        this.configurator = new Configurator(automaticConfigReload);
        this.configurator.updateConfig(filePath);
    }

    /**
     * 返回配置信息
     */
    public get config(): T {
        if (!this.configurator) {
            return {} as any;
        }
        return this.configurator.config;
    }
}
