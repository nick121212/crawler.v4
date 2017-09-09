import { ModelProxy } from "modelproxy";
import { FetchEngine } from "modelproxy-engine-fetch";
import { IProxyCtx } from "modelproxy/out/models/proxyctx";

let proxy = new ModelProxy();
let fetchEngine = new FetchEngine();

fetchEngine.init();
fetchEngine.use(async (ctx: IProxyCtx, next: Function) => {
    console.log(ctx.result);

    if (!ctx.result.ok || ctx.result.status !== 200) {
        throw new Error(ctx.result.statusText);
    }

    ctx.result = await ctx.result.json();

    console.log(ctx.result);

    await next();
});

proxy.loadConfig({
    "engine": "fetch",
    "interfaces": [{
        "key": "website",
        "method": "get",
        "path": "/websites",
        "title": "获取网站的数据接口"
    }],
    "key": "webapi",
    "mockDir": "./mocks/",
    "state": "dev",
    "states": {
        "dev": "http://localhost:3001",
        "prod": "http://localhost:3001"
    },
    "title": "webapi接口数据"
}, { engine: "fetch" });

proxy.addEngines({
    "fetch": fetchEngine
});

export default proxy;
