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
            let { timeout = 5000, headers = {}, proxyInfo = "" } = settings || {};
            let searchParams = new URLSearchParams();

            Object.keys(params).forEach((key) => {
                if (params[key] !== undefined) {
                    searchParams.append(key, params[key]);
                }
            });

            try {
                ctx.result = await this.house(path + (searchParams.toString() ? "?" + searchParams.toString() : ""), headers, proxyInfo);
            } catch (e) {
                ctx.err = e;
                ctx.isError = true;
            }

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
            console.log((ctx.err as Error).message);
            throw ctx.err;
        }

        return ctx.result;
    }


    private house(url: string, headers: any, proxyInfo: string): Promise<any> {
        let horseman: any,
            horsemanSetting: any = {
                timeout: 30000,
                loadImages: false,
                ignoreSSLErrors: true
            },
            result = {},
            resources: any = {};

        if (proxyInfo) {
            horsemanSetting.proxy = proxyInfo;
            horsemanSetting.proxyType = "http";
        }

        return new Promise((resolve, reject) => {
            let rtn = { statusCode: 0, body: "" };

            horseman = new Horseman(horsemanSetting);
            horseman
                .userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/538.1 (KHTML, like Gecko) Safari/538.")
                .on("resourceReceived", (res: any) => {
                    resources[res.url] = res;
                })
                .on("resourceRequested", (req: any) => {
                    console.log("Request " + JSON.stringify(req, undefined, 4));
                })
                // .headers(headers)
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
                    console.log(err);
                    reject(err);
                });
        });
    }

}
