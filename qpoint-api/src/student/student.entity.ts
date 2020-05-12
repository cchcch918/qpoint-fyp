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
import {ClassEntity} from "../class/class.entity";
import {GroupEntity} from "../group/group.entity";
import {BehaviourEntity} from "../behaviour/behaviour.entity";
import {BadgeEntity} from "../badge/badge.entity";

@Entity('student')
export class StudentEntity {
    @PrimaryGeneratedColumn({name: 'student_id'})
    studentId: string;

    @CreateDateColumn({name: 'date_created'})
    dateCreated: Date;

    @Column({name: 'full_name'})
    fullName: string;

    @ManyToOne(type => ParentEntity, parent => parent.children)
    @JoinColumn({name: 'parent_id'})
    parent: ParentEntity;

    @ManyToOne(type => ClassEntity, studentClass => studentClass.students)
    @JoinColumn({name: 'class_id'})
    class: ClassEntity;

    @ManyToMany(type => GroupEntity)
    @JoinTable({
        name: 'student_group',
        joinColumn: {
            name: "student_id",
            referencedColumnName: "studentId"
        },
        inverseJoinColumn: {
            name: "group_id",
            referencedColumnName: "groupId"
        }
    })
    groups: GroupEntity[];

    @ManyToMany(type => BehaviourEntity)
    @JoinTable({
        name: 'student_behaviour',
        joinColumn: {
            name: "student_id",
            referencedColumnName: "studentId"
        },
        inverseJoinColumn: {
            name: "behaviour_id",
            referencedColumnName: "behaviourId"
        }
    })
    behaviours: BehaviourEntity[];

    @ManyToMany(type => BadgeEntity)
    @JoinTable({
        name: 'student_badge',
        joinColumn: {
            name: "student_id",
            referencedColumnName: "studentId"
        },
        inverseJoinColumn: {
            name: "badge_id",
            referencedColumnName: "badgeId"
        }
    })
    badges: BadgeEntity[];


    toResponseObject(): any {
        const {studentId, dateCreated, fullName, parent} = this;

        const responseObject = {
            studentId: studentId, dateCreated, fullName, parent
        };
        if (this.parent) {
            console.log('parent', this.parent)
            responseObject.parent = this.parent;
        }
        return responseObject;
    }
}