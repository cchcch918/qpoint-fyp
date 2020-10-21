import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {NotificationEntity} from "./notification.entity";
import {NotificationController} from "./notification.controller";
import {NotificationService} from "./notification.service";
import {ParentEntity} from "../parent/parent.entity";
import {StaffEntity} from "../staff/staff.entity";

@Module({
    imports: [TypeOrmModule.forFeature([NotificationEntity, ParentEntity, StaffEntity])],
    controllers: [NotificationController],
    providers: [NotificationService],
})
export class NotificationModule {
}