"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const enums_1 = require("@nestjs/microservices/enums");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app/app.module");
const error_filter_1 = require("./filters/error.filter");
const Express = require("express");
const bodyParser = require("body-parser");
const express = Express();
const app = core_1.NestFactory.create(app_module_1.ApplicationModule, express);
app.then((con) => {
    express
        .use(bodyParser.json({ type: 'application/json' }))
        .use(bodyParser.urlencoded({
        extended: false
    }))
        .use(bodyParser.json());
    express.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });
    const microservice = con.connectMicroservice({
        transport: enums_1.Transport.TCP,
    });
    con.useGlobalFilters(new error_filter_1.CustomExceptionFilter());
    con.startAllMicroservices(() => console.log("All microservices are listening..."));
    con.listen(3001, () => console.log("Application listen on port:", 3001));
});
//# sourceMappingURL=server.js.map