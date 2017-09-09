import { Module, MiddlewaresConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { SenecaService } from "./seneca.service";
import { SenecaController } from "./seneca.controller";

@Module({
    components: [
        SenecaService
    ],
    controllers: [SenecaController],
    modules: [],
})
export class SenecaModule implements NestModule {
}
