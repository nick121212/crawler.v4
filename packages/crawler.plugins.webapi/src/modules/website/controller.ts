import { Response } from 'express';
import { Controller, Get, Post, HttpStatus, Req, Res, Param, Body, Put, Delete } from '@nestjs/common';
import { WebsiteService } from "./service";

@Controller("websites")
export class WebsitesController {

    constructor(private entityService: WebsiteService) {
    }

    // C
    @Post('/')
    public async add( @Res() res: Response, @Body('data') data: any) {
        const entity = await this.entityService.add(data);

        res.status(HttpStatus.CREATED).json(entity);
    }

    // R
    @Get('/')
    public async getAll( @Res() res: Response) {
        // const entities = await this.entityService.getAll();
        let entities = await this.entityService.getAll({
            join: {
                alias: "website",
                leftJoinAndSelect: {
                    "flow": "website.flow"
                }
            }
        });
        let total = await (await this.entityService.repository).count();

        res.status(HttpStatus.OK).json({
            rows: entities,
            total: total
        });
    }

    @Get('/:id')
    public async get( @Req() req: any, @Res() res: Response, @Param('id') id: number) {
        const entity = req.entity;

        res.status(HttpStatus.OK).json(entity);
    }

    // U
    @Put('/:id')
    public async replace( @Req() req: any, @Res() res: Response, @Body('entity') data: any, @Param('id') id: number) {
        // EmployeeFindMiddleware attaches the found employee to the request or returns a 404
        const entity = req.entity;
        // in this case, we don't need to interact with it.
        const replacedEmployee = await this.entityService.update(entity);
        res.status(HttpStatus.OK).json(replacedEmployee);
    }

    // D
    @Delete('/:id')
    public async delete( @Req() req: any, @Res() res: Response, @Param('id') id: number) {
        const entity = req.employee;

        const deletedEntity = await this.entityService.remove(entity);
        res.status(HttpStatus.OK).json(deletedEntity);
    }
}
