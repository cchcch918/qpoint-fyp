import {TypeOrmModule} from "@nestjs/typeorm";
import {StaffService} from "./staff.service";
import {Module} from "@nestjs/common";
import {StaffEntity} from "./staff.entity";
import {StaffController} from "./staff.controller";
import {AuthGuard} from "../utils/auth.guard";
import {StudentBehaviourRecordEntity} from "../student-behaviour-record/student-behaviour-record.entity";
import {BehaviourEntity} from "../behaviour/behaviour.entity";

@Module({
    imports: [TypeOrmModule.forFeature([StaffEntity, StudentBehaviourRecordEntity, BehaviourEntity])],
    controllers: [StaffController],
    providers: [StaffService, AuthGuard],
})
export class StaffModule {
}