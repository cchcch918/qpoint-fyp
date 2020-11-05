import {IsNotEmpty,IsArray,ArrayNotEmpty} from "class-validator";

export class NotificationDto {

}

export class CreateNotificationDto {
    @IsNotEmpty()
    createdByAdminId: string;

    @IsNotEmpty()
    notificationTitle: string;

    @IsNotEmpty()
    notificationMessage: string;
}

export class deleteNotificationsDto {
    @IsArray()
    @ArrayNotEmpty()
    notificationsList: number[];
}
