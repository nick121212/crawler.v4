import { Response } from 'express';
import { Controller, Get, Post, HttpStatus, Req, Res, Param, Body, Put, Delete, UsePipes } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import * as Joi from "joi";

import { SenecaService } from "./seneca.service";
import { JoiValidatorPipe } from '../../pipes/validate.pipe';

@Controller()
export class SenecaController {

    constructor(private senecaService: SenecaService) {
    }

    // C
    @Post('act')
    @UsePipes(new JoiValidatorPipe(Joi.object().required(), ({ data }) => data === 'config'))
    @UsePipes(new JoiValidatorPipe(Joi.string().required(), ({ data }) => data === 'parttern'))
    public async act( @Res() res: Response, @Body('parttern') parttern: string, @Body('config') config: any) {
        if (!this.senecaService.seneca.has(parttern)) {
            throw new HttpException("没有发现parttern:" + parttern, 404);
        }

        console.log(parttern, config);

        try {
            res.send(await this.senecaService.seneca.actAsync(parttern, config || {}));
        } catch (e) {
            throw new HttpException(e.message, 405);
        }
    }

    @Get('members')
    public async getMembers( @Req() req, @Res() res: Response) {
        let data = await this.senecaService.seneca.actAsync("role:mesh,get:members");

        res.send(data);
        // return data;
    }

    @Post('find')
    public async actTest2( @Res() res: Response, @Body('parttern') parttern: string) {
        let data = await this.senecaService.seneca.list(parttern);

        res.send(data);
    }

    // R
    @Get('act')
    public async actTest( @Req() req, @Res() res: Response) {
        let data = await this.senecaService.seneca.actAsync("role:crawler.plugin.queue,cmd:queue", {
            "queueConfig": {
                "domainWhiteList": ["(.*?).jd.com"],
                "fetchConditions": [],
                "filterByDomain": true,
                "host": "www.jd.com",
                "ignoreWWWDomain": false,
                "initialPort": 80,
                "initialProtocol": "https",
                "scanSubdomains": true,
                "stripQuerystring": false,
                "stripWWWDomain": false,
            },
            "urls": ["https://search.jd.com/search?keyword=%E6%B2%99%E5%8F%91&enc=utf-8&ev=exbrand_%E8%8A%9D%E5%8D%8E%E4%BB%95%EF%BC%88CHEERS%EF%BC%89/"]
        });

        let data1 = await this.senecaService.seneca.actAsync("role:mesh,get:members");

        console.log(data1);

        res.send(data);
        // return data;
    }
}
