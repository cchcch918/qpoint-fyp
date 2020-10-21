import {BeforeInsert, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {StudentEntity} from "../student/student.entity";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {NotificationEntity} from "../notification/notification.entity";


@Entity('parent')
export class ParentEntity {
    @PrimaryGeneratedColumn({name: 'parent_id'})
    parentId: number;

    @Column({name: 'email', unique: true})
    email: string;

    @Column()
    password: string;

    @OneToMany(type => StudentEntity, children => children.parent, {cascade: true})
    children: StudentEntity[]

    @ManyToMany(type => NotificationEntity, notificationEntity => notificationEntity.parents, {onDelete: "CASCADE"})
    notifications: NotificationEntity[];

    @Column({name: 'device_id'})
    deviceId: string;

    @Column({name: 'device_platform'})
    devicePlatform: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }


    private get token(): string {
        const {parentId, email} = this;
        return jwt.sign(
            {
                parentId, email,
            },
            process.env.SECRET,
            {expiresIn: '7d'},
        );
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    toResponseObject(): any {
        const {parentId, email, token, deviceId, devicePlatform} = this;
        const responseObject: any = {
            parentId, email, token, deviceId, devicePlatform
        };
        if (this.children) {
            responseObject.children = this.children;
        }
        return responseObject;
    }
}
