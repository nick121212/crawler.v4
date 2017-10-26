import * as Express from "express";
import { Seneca } from "crawler.plugins.common";
import * as inversify from "inversify";
import * as path from "path";
import { Component } from "@nestjs/common";

import { container } from "./container";

const wellknown = require("nodemailer-wellknown");

@Component()
export abstract class SenecaService {

    public seneca: any;

    constructor() {
        const seneca = new Seneca<any>(container, {
            tag: "crawler.plugins.webapi"
        });

        this.seneca = seneca.seneca;

        seneca.seneca.use("mail", {
            config: {
                auth: {
                    pass: "871225feng",
                    user: "nick121212",
                },
                ...wellknown("126"),
                secureConnection: true
            },
            folder: path.join(__dirname, "../../../", "/emails"),
            mail: {
                from: "crawler <nick121212@126.com>",
                subject: "爬虫邮件"
            }
        });

        seneca.seneca.ready(async () => {
            console.log("crawler.plugins.webapi ready!;");
        });
    }
}

