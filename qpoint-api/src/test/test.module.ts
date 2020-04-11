import {Module} from '@nestjs/common';
import {TestService} from './test.service';
import {TestController} from './test.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TestEntity} from "./test.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TestEntity])],
    controllers: [TestController],
    providers: [TestService],
})
export class TestModule {
}
