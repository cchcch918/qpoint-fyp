import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ParentEntity} from "../parent/parent.entity";

@Entity('notification')
export class NotificationEntity {
    @PrimaryGeneratedColumn({name: 'notification_id'})
    notificationId: number;

    @ManyToOne(type => ParentEntity, parent => parent.notifications)
    @JoinColumn({name: 'parent_id'})
    parent: ParentEntity;

}