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
import {BadgeEntity} from "../badge/badge.entity";

@Entity('student')
export class StudentEntity {
    @PrimaryGeneratedColumn({name: 'student_id'})
    studentId: number;

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

    @ManyToMany(type => GroupEntity, groupEntity => groupEntity.students, {onDelete: "CASCADE"})
    groups: GroupEntity[];


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

    @Column({name: 'profile_image_path', nullable: true})
    profileImagePath: string;


    toResponseObject(): any {
        const {studentId, dateCreated, fullName, parent} = this;

        const responseObject = {
            studentId: studentId, dateCreated, fullName, parent
        };
        if (this.parent) {
            responseObject.parent = this.parent;
        }
        return responseObject;
    }
}