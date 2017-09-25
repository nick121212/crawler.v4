import "reflect-metadata";
import { Seneca } from "crawler.plugins.common";
import * as cluster from "cluster";

import { container } from "./container";
import { pluginName } from "./constants";

const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行`);
    // 衍生工作进程。
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出`);
    });
} else {
    let seneca = new Seneca(container, {
        tag: pluginName
    });

    seneca.seneca
        .ready(() => {
            console.log("crawler.plugins.html ready");
        });

    console.log(`工作进程 ${process.pid} 已启动`);
}
