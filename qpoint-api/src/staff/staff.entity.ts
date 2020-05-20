import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as crypto from "crypto";
import {GroupEntity} from "../group/group.entity";
import {ClassEntity} from "../class/class.entity";
import {SchoolEntity} from "../school/school.entity";


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

    @OneToMany(type => GroupEntity, group => group.staff, {cascade: true})
    groups: GroupEntity[];

    @ManyToOne(type => SchoolEntity, school => school.staffs)
    @JoinColumn({name: 'school_id'})
    school: SchoolEntity;

    @Column({name: 'reset_password_token', nullable: true})
    resetPasswordToken: string;

    @Column({name: 'reset_password_expires', nullable: true})
    resetPasswordExpires: Date;

    private get token(): string {
        const {staffId, username} = this;
        return jwt.sign(
            {
                staffId, username,
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
        const {staffId, dateCreated, username, email, token} = this;
        const responseObject = {
            staffId, dateCreated, username, email, token
        };
        return responseObject;
    }
}