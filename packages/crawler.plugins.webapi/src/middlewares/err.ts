import { NestMiddleware, Middleware, HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/core";

@Middleware()
export class ErrorMiddleware implements NestMiddleware {
    public resolve() {
        return async (req: any, res: any, next: any) => {
            try {
                await next();
            } catch (e) {
                console.log("--------------");
                throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
            }
        };
    }
}
