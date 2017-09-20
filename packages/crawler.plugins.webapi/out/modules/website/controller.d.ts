/// <reference types="express" />
import { Response } from 'express';
import { WebsiteService } from "./service";
export declare class WebsitesController {
    private entityService;
    constructor(entityService: WebsiteService);
    add(res: Response, data: any): Promise<void>;
    getAll(res: Response): Promise<void>;
    get(req: any, res: Response, id: number): Promise<void>;
    replace(req: any, res: Response, data: any, id: number): Promise<void>;
    delete(req: any, res: Response, id: number): Promise<void>;
}
