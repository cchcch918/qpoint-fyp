import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

import {ParentEntity} from "../parent/parent.entity";

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