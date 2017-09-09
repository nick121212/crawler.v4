/// <reference types="express" />
import { Response } from 'express';
import { SenecaService } from "./seneca.service";
export declare class SenecaController {
    private senecaService;
    constructor(senecaService: SenecaService);
    act(res: Response, parttern: string, config: any): Promise<void>;
    getMembers(req: any, res: Response): Promise<void>;
    actTest2(res: Response, parttern: string): Promise<void>;
    actTest(req: any, res: Response): Promise<void>;
}
