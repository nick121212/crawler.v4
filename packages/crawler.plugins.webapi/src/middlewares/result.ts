import { NestMiddleware, Middleware } from "@nestjs/common";

@Middleware()
export class ResultMiddleware implements NestMiddleware {
    public resolve() {
        return async (req: any, res: Response, next: any) => {
            next();
        };
    }
}
