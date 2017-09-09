import { NestMiddleware } from "@nestjs/common";
export declare class ResultMiddleware implements NestMiddleware {
    resolve(): (req: any, res: any, next: any) => Promise<void>;
}
