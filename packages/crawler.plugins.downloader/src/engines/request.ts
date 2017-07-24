import { modelProxy, IProxyCtx, IInterfaceModel, IExecute } from 'modelproxy';
import * as request from 'request-promise';
import { injectable } from 'inversify';

@injectable()
export class RequestEngine extends modelProxy.BaseEngine {
    public engineName: string = "request";
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
    init(): void {
        this.use(async (ctx: IProxyCtx, next: Function): Promise<any> => {
            let path = this.getFullPath(ctx.instance || {}, ctx.executeInfo || {});
            let { method = "" } = ctx.instance || {};
            let { data = null, settings = {} } = ctx.executeInfo || {};
            let { timeout = 5000 } = settings || {};

            try {
                ctx.result = await request(path, {
                    method: method.toString(),
                    body: data,
                    json: true,
                    resolveWithFullResponse: true,
                    timeout: timeout
                }, undefined);
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
    async proxy(instance: IInterfaceModel, options: IExecute): Promise<any> {
        const fn = this.callback(() => { });
        const ctx: IProxyCtx = {
            instance: instance,
            executeInfo: options,
        };

        await fn(ctx);

        if (ctx.isError) {
            return ctx.err;
        }

        return ctx.result;
    }
}