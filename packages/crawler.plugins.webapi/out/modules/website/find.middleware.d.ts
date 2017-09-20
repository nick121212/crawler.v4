import { NestMiddleware } from '@nestjs/common';
import { WebsiteService } from './service';
export declare class FindMiddleware implements NestMiddleware {
    private entityService;
    /**
     * Only interact with the Employee service via the Service<Interface> to ensure loose coupling
     */
    constructor(entityService: WebsiteService);
    resolve(): (req: any, res: any, next: any) => Promise<void>;
}
