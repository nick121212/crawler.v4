/// <reference types="express" />
import { Response } from "express";
import { SenecaService } from "./seneca.service";
export declare class SenecaController {
    private senecaService;
    constructor(senecaService: SenecaService);
    /**
     * 调用插件
     * @param res      Response
     * @param parttern 模式
     * @param config   模式所需的数据
     */
    act(res: Response, parttern: string, config: any): Promise<void>;
    getMembers(res: Response): Promise<void>;
    actTest2(res: Response, parttern: string): Promise<void>;
    log(res: Response, result: any): Promise<void>;
    addBusiness(pdt_sku: string, business_id: number, business_sku_url: string, show_price: string, res: Response): Promise<void>;
}
