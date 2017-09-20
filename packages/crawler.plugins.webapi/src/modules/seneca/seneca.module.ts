import { Module, MiddlewaresConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { SenecaService } from "./seneca.service";
import { SenecaController } from "./seneca.controller";
import { ErrorMiddleware } from '../../middlewares/err';

@Module({
    components: [
        SenecaService
    ],
    controllers: [SenecaController],
    modules: [],
})
export class SenecaModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(ErrorMiddleware).forRoutes(SenecaController);

        return consumer;
    }
}