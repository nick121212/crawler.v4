/// <reference types="express" />
import { Response } from "express";
import { SenecaService } from "./seneca.service";
export declare class SenecaController {
    private senecaService;
    constructor(senecaService: SenecaService);
    act(res: Response, parttern: string, config: any): Promise<void>;
    getMembers(req: any, res: Response): Promise<void>;
    actTest2(res: Response, parttern: string): Promise<void>;
    log(res: Response, result: any): Promise<void>;
    addBusiness(pdt_sku: string, business_id: number, business_sku_url: string, show_price: string, res: Response): Promise<void>;
}
