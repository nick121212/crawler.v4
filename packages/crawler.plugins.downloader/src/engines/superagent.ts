import * as request from "superagent";

import { modelProxy, IProxyCtx, IInterfaceModel, IExecute } from "modelproxy";
import { injectable } from "inversify";
import { URLSearchParams } from "url";

require("superagent-charset")(request);
require("superagent-proxy")(request);

@injectable()
export class SuperAgentEngine extends modelProxy.BaseEngine {
    public engineName = "superagent";
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
            let { data = null, settings = {}, params = null } = ctx.executeInfo || {};
            let { timeout = 5000, header = {}, charset = "utf-8", proxyInfo = "" } = settings || {};

            console.log(charset);

            try {
                let curReq: any = request(method.toString() || "get", path).withCredentials();

                // 代理
                if (proxyInfo) {
                    curReq.proxy(`http://${proxyInfo}`);
                }
                // 参数
                if (params) {
                    curReq.query(params);
                }
                // 数据
                if (data) {
                    curReq.send(data);
                }
                // headers
                if (header) {
                    curReq.set(header);
                }
                // 超时时间
                curReq.timeout({
                    response: timeout,
                    deadline: 60000
                });
                // 字符编码
                if (charset) {
                    curReq.charset(charset);
                }

                ctx.result = await curReq;
                ctx.result.body = ctx.result.text;
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
            throw ctx.err;
        }

        return ctx.result;
    }
}
