import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {ParentEntity} from "../parent/parent.entity";
import {StaffEntity} from "../staff/staff.entity";

@Entity('notification')
export class NotificationEntity {
    @PrimaryGeneratedColumn({name: 'notification_id'})
    notificationId: number;

    @CreateDateColumn({name: 'date_created'})
    dateCreated: Date;

    @ManyToOne(type => StaffEntity)
    @JoinColumn({name: 'created_by_admin'})
    createdByAdmin: StaffEntity;

    @Column({name: 'notification_title'})
    notificationTitle: string;

    @Column({name: 'notification_message'})
    notificationMessage: string;

    @ManyToMany(type => ParentEntity, parentEntity => parentEntity.notifications, {cascade: true, onDelete: "CASCADE"})
    @JoinTable({
        name: 'parent_notifications',
        joinColumn: {
            name: "notification_id",
            referencedColumnName: "notificationId"
        },
        inverseJoinColumn: {
            name: "parent_id",
            referencedColumnName: "parentId"
        }
    })
    parents: ParentEntity[];

}