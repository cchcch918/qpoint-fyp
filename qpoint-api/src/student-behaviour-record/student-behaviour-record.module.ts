import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {StudentBehaviourRecordEntity} from "./student-behaviour-record.entity";
import {StudentBehaviourRecordService} from "./student-behaviour-record.service";
import {StudentBehaviourRecordController} from "./student-behaviour-record.controller";
import {StudentEntity} from "../student/student.entity";
import {BehaviourEntity} from "../behaviour/behaviour.entity";
import {StaffEntity} from "../staff/staff.entity";
import {ClassEntity} from "../class/class.entity";

@Module({
    imports: [TypeOrmModule.forFeature([StudentBehaviourRecordEntity, StudentEntity, BehaviourEntity, StaffEntity, ClassEntity])],
    controllers: [StudentBehaviourRecordController],
    providers: [StudentBehaviourRecordService],
})
export class StudentBehaviourRecordModule {
}