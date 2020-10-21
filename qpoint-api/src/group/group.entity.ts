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
import {StaffEntity} from "../staff/staff.entity";
import {StudentEntity} from "../student/student.entity";

@Entity('group')
export class GroupEntity {
    @PrimaryGeneratedColumn({name: 'group_id',},)
    groupId: number;

    @Column({name: 'group_name'})
    groupName: string;

    @CreateDateColumn({name: 'date_created'})
    dateCreated: Date;

    @ManyToOne(type => StaffEntity)
    @JoinColumn({name: 'created_by_admin'})
    createdByAdmin: StaffEntity;

    @ManyToOne(type => StaffEntity, staff => staff.groups)
    @JoinColumn({name: 'staff_id'})
    teacher: StaffEntity;


    @ManyToMany(type => StudentEntity, studentEntity => studentEntity.groups, {cascade: true, onDelete: "CASCADE"})
    @JoinTable({
        name: 'student_group',
        joinColumn: {
            name: "group_id",
            referencedColumnName: "groupId"
        },
        inverseJoinColumn: {
            name: "student_id",
            referencedColumnName: "studentId"
        }
    })
    students: StudentEntity[];


    toResponseObject(): any {
        const {groupId, dateCreated, groupName, createdByAdmin, students, teacher} = this;
        const responseObject = {
            groupId, dateCreated, groupName, createdByAdmin, students, teacher
        };
        return responseObject;
    }

}

