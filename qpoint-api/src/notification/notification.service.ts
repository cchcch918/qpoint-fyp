import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {NotificationEntity} from "./notification.entity";

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(NotificationEntity) private notificationRepository: Repository<NotificationEntity>) {
    }
}