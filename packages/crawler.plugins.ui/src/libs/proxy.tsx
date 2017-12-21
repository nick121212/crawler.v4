import { ModelProxy } from "modelproxy";
import { FetchEngine } from "modelproxy-engine-fetch";
import { IProxyCtx } from "modelproxy/out/models/proxyctx";

import webapiConfig from "../common/modelproxy/webapi";

let proxy = new ModelProxy();
let fetchEngine = new FetchEngine();

fetchEngine.init();
fetchEngine.use(async (ctx: IProxyCtx, next: Function) => {
    if (!ctx.result.ok || ctx.result.status !== 200) {
        throw new Error(ctx.result.statusText);
    }
    let text = await ctx.result.text();

    if (!text) {
        ctx.result = {
            code: 200
        };
    } else {
        ctx.result = JSON.parse(text);
    }

    await next();
});

fetchEngine.use(async (ctx: IProxyCtx, next: Function) => {
    if (ctx.result.code !== undefined && ctx.result.code !== 200) {
        throw new Error(ctx.result.error);
    }

    await next();
});


proxy.loadConfig(webapiConfig, { engine: "fetch" });

proxy.addEngines({
    "fetch": fetchEngine
});

export default proxy;
