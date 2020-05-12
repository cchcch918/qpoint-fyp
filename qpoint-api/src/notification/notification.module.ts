import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {NotificationEntity} from "./notification.entity";
import {NotificationController} from "./notification.controller";
import {NotificationService} from "./notification.service";

@Module({
    imports: [TypeOrmModule.forFeature([NotificationEntity])],
    controllers: [NotificationController],
    providers: [NotificationService],
})
export class NotificationModule {
}