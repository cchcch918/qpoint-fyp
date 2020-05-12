import {Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {StudentEntity} from "../student/student.entity";

@Entity('class')
export class ClassEntity {
    @PrimaryGeneratedColumn({name: 'class_id'})
    classId: string;

    @OneToMany(type => StudentEntity, user => user.class, {cascade: true})
    students: StudentEntity[];
}