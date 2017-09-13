"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var crawler_plugins_common_1 = require("crawler.plugins.common");
var cluster = require("cluster");
var container_1 = require("./container");
var constants_1 = require("./constants");
var numCPUs = require("os").cpus().length;
// const cluster = require('cluster');
// const http = require('http');
// const numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
    console.log("\u4E3B\u8FDB\u7A0B " + process.pid + " \u6B63\u5728\u8FD0\u884C");
    // 衍生工作进程。
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on("exit", function (worker, code, signal) {
        console.log("\u5DE5\u4F5C\u8FDB\u7A0B " + worker.process.pid + " \u5DF2\u9000\u51FA");
    });
}
else {
    var seneca = new crawler_plugins_common_1.Seneca(container_1.container, {
        tag: constants_1.pluginName
    });
    seneca.seneca
        .ready(function () {
        console.log("crawler.plugins.html ready");
    });
    console.log("\u5DE5\u4F5C\u8FDB\u7A0B " + process.pid + " \u5DF2\u542F\u52A8");
}
//# sourceMappingURL=index.js.map