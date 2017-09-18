import { modelProxy, IProxyCtx, IInterfaceModel, IExecute } from "modelproxy";
import { injectable } from "inversify";
import { URLSearchParams } from "url";

const Horseman = require("node-horseman");

@injectable()
export class PhantomEngine extends modelProxy.BaseEngine {
    public engineName = "phantom";
    /**
     * 构造
     */
    constructor() {
        super();
        this.init();
    }

    /**
     * 初始化中间件
     */
    public init(): void {
        this.use(async (ctx: IProxyCtx, next: Function): Promise<any> => {
            let path = this.getFullPath(ctx.instance || {}, ctx.executeInfo || {});
            let { method = "" } = ctx.instance || {};
            let { data = null, settings = {}, params = {} } = ctx.executeInfo || {};
            let { timeout = 5000, headers = {} } = settings || {};
            let searchParams = new URLSearchParams();

            Object.keys(params).forEach((key) => {
                params[key] && searchParams.append(key, params[key]);
            });

            try {
                ctx.result = await this.house(path + (searchParams.toString() ? "?" + searchParams.toString() : ""));
            } catch (e) {
                ctx.err = e;
                ctx.isError = true;
            }

            console.log(ctx.result.statusCode);

            await next();
        });
    }

    /**
     * 调用接口
     * @param instance 接口的实例
     * @param options  参数
     */
    public async proxy(instance: IInterfaceModel, options: IExecute): Promise<any> {
        const fn = this.callback(() => { });
        const ctx: IProxyCtx = {
            instance: instance,
            executeInfo: options,
        };

        await fn(ctx);

        if (ctx.isError) {
            throw ctx.err;
        }

        return ctx.result;
    }


    private house(url: string): Promise<any> {
        let horseman: any,
            horsemanSetting = {
                timeout: 60000,
                loadImages: false,
                ignoreSSLErrors: true
            },
            result = {},
            resources: any = {};

        // return new Promise((resolve, reject) => {
        // if (settings.useProxy && settings.ipInfo && settings.ipInfo.port && settings.ipInfo.port) {
        //     horsemanSetting.proxy = `http://${settings.ipInfo.host}:${settings.ipInfo.port}`;
        //     horsemanSetting.proxyType = "http";
        // }

        return new Promise((resolve, reject) => {
            let rtn = { statusCode: 0, body: "" };

            horseman = new Horseman(horsemanSetting);
            horseman
                .userAgent("")
                .on("resourceReceived", (res: any) => {
                    resources[res.url] = res;
                })
                .open(url)
                .wait(10)
                .status()
                .then((statusCode: number) => {
                    rtn.statusCode = statusCode;
                })
                .html()
                .then((body: string) => {
                    rtn.body = body;
                })
                .close()
                .then(() => {
                    resolve(rtn);
                }).catch((err: Error) => {
                    reject(err);
                });
        });
    }

}
