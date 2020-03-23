import {Module} from '@nestjs/common';
import {TestService} from './test.service';
import {TestController} from './test.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Test} from "./test.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Test])],
    providers: [TestService],
    controllers: [TestController]
})
export class TestModule {
}
