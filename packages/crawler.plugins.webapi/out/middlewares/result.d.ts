import { NestMiddleware } from "@nestjs/common";
export declare class ResultMiddleware implements NestMiddleware {
    resolve(): (req: any, res: Response, next: any) => Promise<void>;
}
