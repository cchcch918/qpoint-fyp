import {BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as crypto from "crypto";
import {GroupEntity} from "../group/group.entity";
import {ClassEntity} from "../class/class.entity";
import {StudentBehaviourRecordEntity} from "../student-behaviour-record/student-behaviour-record.entity";


@Entity('staff')
export class StaffEntity {
    @PrimaryGeneratedColumn({name: 'staff_id'})
    staffId: number;

    @CreateDateColumn({name: 'date_created'})
    dateCreated: Date;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @ManyToMany(type => ClassEntity, classEntity => classEntity.teachers, {onDelete: "CASCADE"})
    classes: ClassEntity[];

    @OneToMany(type => GroupEntity, group => group.teacher, {cascade: true})
    groups: GroupEntity[];


    @Column({name: 'is_admin', nullable: true})
    isAdmin: string;

    @OneToMany(type => StudentBehaviourRecordEntity, studentBehaviourRecordEntity => studentBehaviourRecordEntity.givenByTeacher)
    records: StudentBehaviourRecordEntity[];

    @Column({name: 'reset_password_token', nullable: true})
    resetPasswordToken: string;

    @Column({name: 'reset_password_expires', nullable: true})
    resetPasswordExpires: Date;

    private get token(): string {
        const {staffId, username, email} = this;
        return jwt.sign(
            {
                staffId, username, email
            },
            process.env.SECRET,
            {expiresIn: '7d'},

        );
    }

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    async generateResetPasswordToken() {
        this.resetPasswordToken = crypto.randomBytes(16).toString('hex');
        this.resetPasswordExpires = new Date();
        this.resetPasswordExpires.setHours(this.resetPasswordExpires.getHours() + 1);// 1 hour to expired
    }

    toResponseObject(): any {
        const {staffId, dateCreated, username, email, token, isAdmin} = this;
        const responseObject = {
            staffId, dateCreated, username, email, token, isAdmin
        };
        return responseObject;
    }
}