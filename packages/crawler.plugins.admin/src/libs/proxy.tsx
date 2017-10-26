import { ModelProxy } from "modelproxy";
import { FetchEngine } from "modelproxy-engine-fetch";
import { IProxyCtx } from "modelproxy/out/models/proxyctx";

import webapiConfig from "../common/modelproxy/webapi";
import holoautoConfig from "../common/modelproxy/holoauto";

let proxy = new ModelProxy();
let fetchEngine = new FetchEngine();

fetchEngine.init();
fetchEngine.use(async (ctx: IProxyCtx, next: Function) => {
    if (!ctx.result.ok || ctx.result.status !== 200) {
        throw new Error(ctx.result.statusText);
    }

    let text = await ctx.result.text();

    if (!text) {
        // throw new Error("dkfjkadkljflkjad");
        ctx.result = {};
    } else {
        ctx.result = JSON.parse(text);
    }

    await next();
});

fetchEngine.use(async (ctx: IProxyCtx, next: Function) => {
    if (ctx.instance.ns === "holoauto") {
        if (ctx.result.code !== 200) {
            throw new Error(ctx.result.message || "接口请求错误");
        }
    }

    await next();
});

proxy.loadConfig(webapiConfig, { engine: "fetch" });
proxy.loadConfig(holoautoConfig, { engine: "fetch" });

proxy.addEngines({
    "fetch": fetchEngine
});

export default proxy;
