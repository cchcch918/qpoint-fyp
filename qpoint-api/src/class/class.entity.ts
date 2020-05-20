import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {StudentEntity} from "../student/student.entity";
import {StaffEntity} from "../staff/staff.entity";

@Entity('class')
export class ClassEntity {
    @PrimaryGeneratedColumn({name: 'class_id'})
    classId: number;

    @CreateDateColumn({name: 'date_created'})
    dateCreated: Date;

    @Column({name: 'class_name'})
    className: string;

    @ManyToOne(type => StaffEntity)
    @JoinColumn({name: 'created_by_admin'})
    createdByAdmin: StaffEntity;

    @OneToMany(type => StudentEntity, user => user.class)
    students: StudentEntity[];

    @ManyToMany(type => StaffEntity, staffEntity => staffEntity.classes, {cascade: true, onDelete: "CASCADE"})
    @JoinTable({
        name: 'staff_class',
        joinColumn: {
            name: "class_id",
            referencedColumnName: "classId"
        },
        inverseJoinColumn: {
            name: "staff_id",
            referencedColumnName: "staffId"
        }
    })
    teachers: StaffEntity[];

    toResponseObject(): any {
        const {classId, dateCreated, className, createdByAdmin, students, teachers} = this;
        const responseObject = {
            classId, dateCreated, className, createdByAdmin, students, teachers
        };
        return responseObject;
    }
}