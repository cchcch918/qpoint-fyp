import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SchoolEntity} from "./school.entity";
import {SchoolController} from "./school.controller";
import {SchoolService} from "./school.service";


@Module({
    imports: [TypeOrmModule.forFeature([SchoolEntity])],
    controllers: [SchoolController],
    providers: [SchoolService],
})
export class SchoolModule {
}