import {ArrayNotEmpty, IsArray, IsNotEmpty} from "class-validator";

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

export class DeleteNotificationsDto {
    @IsArray()
    @ArrayNotEmpty()
    notificationsList: number[];
}
