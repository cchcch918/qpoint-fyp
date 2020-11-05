import {Body, Controller, Post, UsePipes} from "@nestjs/common";
import {NotificationService} from "./notification.service";
import {ValidationPipe} from "../utils/validation.pipe";
import {CreateNotificationDto, deleteNotificationsDto} from "./notification.dto";


@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService) {
    }

    @Post('create-notification')
    @UsePipes(new ValidationPipe())
    createNotification(@Body() payload: CreateNotificationDto) {
        return this.notificationService.createNotification(payload);
    }

    @Post('show-all-notifications')
    @UsePipes(new ValidationPipe())
    showAllNotifications() {
        return this.notificationService.showAllNotifications();
    }

    @Post('delete-notifications')
    @UsePipes(new ValidationPipe())
    deleteNotifications(@Body() payload: deleteNotificationsDto) {
        return this.notificationService.deleteNotifications(payload);
    }
}