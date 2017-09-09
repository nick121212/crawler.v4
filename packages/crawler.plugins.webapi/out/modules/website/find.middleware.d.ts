import { NestMiddleware } from '@nestjs/common';
import { WebsiteService } from './service';
export declare class FindMiddleware implements NestMiddleware {
    private entityService;
    constructor(entityService: WebsiteService);
    resolve(): (req: any, res: any, next: any) => Promise<void>;
}
