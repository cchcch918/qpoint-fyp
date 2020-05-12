import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {ClassEntity} from "./class.entity";
import {ClassController} from "./class.controller";
import {ClassService} from "./class.service";

@Module({
    imports: [TypeOrmModule.forFeature([ClassEntity])],
    controllers: [ClassController],
    providers: [ClassService],
})
export class ClassModule {
}