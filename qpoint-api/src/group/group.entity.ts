import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {StaffEntity} from "../staff/staff.entity";

@Entity('group')
export class GroupEntity {
    @PrimaryGeneratedColumn({name: 'group_id',},)
    groupId: number;

    @ManyToOne(type => StaffEntity, staff => staff.groups)
    @JoinColumn({name: 'staff_id'})
    staff: StaffEntity;
}