import { Transport } from "@nestjs/microservices/enums";
import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./modules/app/app.module";
import { INestApplication } from "@nestjs/common/interfaces/nest-application.interface";
import { CustomExceptionFilter } from "./filters/error.filter";

import * as Express from "express";
import * as bodyParser from "body-parser";

const express = Express();
const app: Promise<INestApplication> = NestFactory.create(ApplicationModule, express);

app.then((con: INestApplication) => {
  express.use(bodyParser.json())
    .use(bodyParser.urlencoded({
      extended: true
    }));

  express.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });

  const microservice = con.connectMicroservice({
    transport: Transport.TCP,
  });

  con.useGlobalFilters(new CustomExceptionFilter());
  con.startAllMicroservices(() => console.log("All microservices are listening..."));
  con.listen(3001, () => console.log("Application listen on port:", 3001));
});

