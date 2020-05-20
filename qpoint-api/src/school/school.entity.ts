import {Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {StaffEntity} from "../staff/staff.entity";

@Entity('school')
export class SchoolEntity {
    @PrimaryGeneratedColumn({name: 'school_id'})
    schoolId: number;

    @OneToMany(type => StaffEntity, staff => staff.school, {cascade: true})
    staffs: StaffEntity[];
}