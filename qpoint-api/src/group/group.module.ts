import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {GroupService} from "./group.service";
import {GroupController} from "./group.controller";
import {GroupEntity} from "./group.entity";
import {StudentEntity} from "../student/student.entity";
import {StaffEntity} from "../staff/staff.entity";

@Module({
    imports: [TypeOrmModule.forFeature([GroupEntity, StudentEntity, StaffEntity])],
    controllers: [GroupController],
    providers: [GroupService],
})
export class GroupModule {
}