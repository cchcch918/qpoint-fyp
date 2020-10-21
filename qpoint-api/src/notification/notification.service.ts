import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {NotificationEntity} from "./notification.entity";
import * as gcm from 'node-gcm';
import {CreateNotificationDto} from "./notification.dto";
import {ParentEntity} from "../parent/parent.entity";
import {AppConstant} from "../utils/constant/app.constant";
import {StaffEntity} from "../staff/staff.entity";


@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(NotificationEntity) private notificationRepository: Repository<NotificationEntity>,
        @InjectRepository(ParentEntity) private parentRepository: Repository<ParentEntity>,
        @InjectRepository(StaffEntity) private staffRepository: Repository<StaffEntity>,
    ) {
    }

    async createNotification(createNotificationDto: CreateNotificationDto) {
        const {createdByAdminId, notificationTitle, notificationMessage} = createNotificationDto
        const admin = await this.staffRepository.findOne({where: {staffId: createdByAdminId}});
        if (!admin) {
            throw new HttpException(
                'Admin does not exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        const newNotification = await this.notificationRepository.create();
        newNotification.createdByAdmin = admin;
        newNotification.notificationTitle = notificationTitle;
        newNotification.notificationMessage = notificationMessage;
        await this.notificationRepository.save(newNotification);

        const parents = await this.parentRepository.find({
            relations: ['notifications'],
        });

        //Only android
        const devices = parents.filter(parent => {
            return parent.devicePlatform === AppConstant.DEVICE_ANDROID
        }).map(parent => {
            return parent.deviceId;
        });
        if (devices.length != 0 && devices) {
            this.sendAndroid(devices, createNotificationDto);
        }

        const promises: any[] = [];
        for (const parent of parents) {
            parent.notifications.push(newNotification)
            promises.push(await this.parentRepository.save(parent));
        }
        return await Promise.all(promises);
    }

    async showAllNotifications() {
        const notifications = await this.notificationRepository.find({
            relations: ['createdByAdmin'],
            order: {dateCreated: "DESC"},
        });
        return notifications;
    }

    sendAndroid(devices: string[], createNotificationDto: CreateNotificationDto) {
        const {notificationTitle, notificationMessage} = createNotificationDto;
        const message = new gcm.Message({
            notification: {
                title: notificationTitle,
                body: notificationMessage,
            }
        });

        const sender = gcm.Sender(process.env.FCM_API_KEY);
        sender.send(message, {
            registrationTokens: devices
        }, (err, response) => {
            if (err) {
                console.log("NOTIFICATION ERROR: ", err);
            } else {
                console.log("NOTIFICATION RESPONSE: ", response);
            }
        });
    }
}