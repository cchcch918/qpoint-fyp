import {CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {StudentEntity} from "../student/student.entity";
import {BehaviourEntity} from "../behaviour/behaviour.entity";
import {StaffEntity} from "../staff/staff.entity";

@Entity('student_behaviour_record')
export class StudentBehaviourRecordEntity {
    @PrimaryGeneratedColumn({name: 'record_id'})
    recordId: number;

    @ManyToOne(type => StudentEntity)
    @JoinColumn({name: 'student'})
    student: StudentEntity;

    @ManyToOne(type => BehaviourEntity)
    @JoinColumn({name: 'behaviour'})
    behaviour: BehaviourEntity;

    @ManyToOne(type => StaffEntity)
    @JoinColumn({name: 'given_by_teacher'})
    givenByTeacher: StaffEntity;

    @CreateDateColumn({name: 'date_given'})
    dateGiven: Date;
}