import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {ClassEntity} from "./class.entity";
import {ClassController} from "./class.controller";
import {ClassService} from "./class.service";
import {StudentEntity} from "../student/student.entity";
import {StaffEntity} from "../staff/staff.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ClassEntity, StudentEntity, StaffEntity])],
    controllers: [ClassController],
    providers: [ClassService],
})
export class ClassModule {
}