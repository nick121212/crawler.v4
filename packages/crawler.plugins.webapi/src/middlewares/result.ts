import { NestMiddleware, Middleware } from "@nestjs/common";

@Middleware()
export class ResultMiddleware implements NestMiddleware {
    public resolve() {
        return async (req, res, next) => {
            // console.log(res);

            next();
        };
    }
}
