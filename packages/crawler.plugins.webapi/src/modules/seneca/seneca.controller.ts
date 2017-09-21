import { Response } from "express";
import { Controller, Get, Post, HttpStatus, Req, Res, Param, Body, Put, Delete, UsePipes } from "@nestjs/common";
import { HttpException } from "@nestjs/core";
import * as Joi from "joi";

import { SenecaService } from "./seneca.service";
import { JoiValidatorPipe } from "../../pipes/validate.pipe";

@Controller()
export class SenecaController {

    constructor(private senecaService: SenecaService) { }

    /**
     * 调用插件
     * @param res      Response
     * @param parttern 模式
     * @param config   模式所需的数据
     */
    @Post("act")
    @UsePipes(new JoiValidatorPipe(Joi.object().required(), ({ data }) => data === "config"))
    @UsePipes(new JoiValidatorPipe(Joi.string().required(), ({ data }) => data === "parttern"))
    public async act( @Res() res: Response, @Body("parttern") parttern: string, @Body("config") config: any) {
        if (!this.senecaService.seneca.has(parttern)) {
            throw new HttpException("没有发现parttern:" + parttern, 404);
        }

        try {
            res.send(await this.senecaService.seneca.actAsync(parttern, config || {}));
        } catch (e) {
            throw new HttpException(e.message, 405);
        }
    }

    @Get("members")
    public async getMembers( @Res() res: Response) {
        let data = await this.senecaService.seneca.actAsync("role:mesh,get:members");

        res.send(data);
    }

    @Post("find")
    public async actTest2( @Res() res: Response, @Body("parttern") parttern: string) {
        let data = await this.senecaService.seneca.list(parttern);

        res.send(data);
    }

    @Post("log")
    public async log( @Res() res: Response, @Body("result") result: any) {
        // let data = await this.senecaService.seneca.list(parttern);

        console.log(result);

        res.send(null);
    }

    @Post("addBusiness")
    @UsePipes(new JoiValidatorPipe(Joi.string().label("pdt_sku").required(), ({ data }) => data === "pdt_sku"))
    @UsePipes(new JoiValidatorPipe(Joi.number().label("business_id").required(), ({ data }) => data === "business_id"))
    @UsePipes(new JoiValidatorPipe(Joi.string().label("business_sku_url").required(), ({ data }) => data === "business_sku_url"))
    public async addBusiness( @Body("pdt_sku") pdt_sku: string,
        @Body("business_id") business_id: number,
        @Body("business_sku_url") business_sku_url: string,
        @Body("show_price") show_price: string, @Res() res: Response) {
        let data = await this.senecaService.seneca.actAsync("role:crawler.plugin.queue,cmd:queue", {
            "queueConfig": {
                "domainWhiteList": ["(.*?).jd.com", "(.*?).tmall.com"],
                "fetchConditions": [],
                "filterByDomain": true,
                "ignoreWWWDomain": false,
                "initialPort": 80,
                "initialProtocol": "https",
                "scanSubdomains": false,
                "stripQuerystring": false,
                "stripWWWDomain": false,
            },
            "queueItem": {
                "path": "/",
                "url": business_id === 1 ? "https://detail.tmall.com" : "https://item.jd.com"
            },
            "urls": [business_sku_url]
        });

        if (!data.length || data[0] === false) {
            throw new HttpException("地址不符合规则！", 406);
        }

        let queueItem = data[0];

        queueItem = Object.assign({}, queueItem, {
            pdt_sku,
            business_id,
            business_sku_url,
            show_price
        });

        // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

        await this.senecaService.seneca.actAsync("role:crawler.plugin.task,cmd:addItemToQueue", {
            "items": [{queueItem}],
            "key": "bijia"
        });

        res.send(queueItem);

    }
}
