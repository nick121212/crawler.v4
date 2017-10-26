import { Module, MiddlewaresConsumer } from '@nestjs/common';

import { DbModule } from "../db/db.module";
import { SenecaModule } from "../seneca/seneca.module";
// import { WebsiteModule } from "../website/module";

@Module({
    components: [],
    modules: [
        // WebsiteModule,
        SenecaModule
    ]
})
export class ApplicationModule {
    
}
