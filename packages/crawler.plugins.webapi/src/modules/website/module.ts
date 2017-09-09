import { Module, MiddlewaresConsumer, RequestMethod, NestModule } from '@nestjs/common';

import { DbModule } from "../db/db.module";
import { WebsiteService } from "./service";
import { WebsitesController } from "./controller";
import { FindMiddleware } from "./find.middleware";
import { Website } from "../../entities/website";
import { ResultMiddleware } from "../../middlewares/result";

@Module({
    components: [
        WebsiteService,
        { provide: "entityClassOrName", useValue: Website }
    ],
    controllers: [WebsitesController],
    modules: [
        DbModule
    ],
})
export class WebsiteModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(FindMiddleware).forRoutes({
            method: RequestMethod.ALL, path: 'websites/:id'
        });
        consumer.apply(ResultMiddleware).forRoutes(WebsitesController);

        return consumer;
    }
}
