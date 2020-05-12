import {BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {StudentEntity} from "../student/student.entity";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {NotificationEntity} from "../notification/notification.entity";

@Entity('parent')
export class ParentEntity {
    @PrimaryGeneratedColumn({name: 'parent_id'})
    parentId: string;

    @Column({name: 'email', unique: true})
    email: string;

    @Column()
    password: string;

    @OneToMany(type => StudentEntity, children => children.parent, {cascade: true})
    children: StudentEntity[]

    @OneToMany(type => NotificationEntity, notification => notification.parent, {cascade: true})
    notifications: NotificationEntity[]

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

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    toResponseObject(): any {
        const {parentId, email, token} = this;
        const responseObject: any = {
            parentId, email, token
        };
        console.log('gotchildren', this.children)
        if (this.children) {
            console.log('gotchildren', this.children)
            responseObject.chidren = this.children;
        }
        return responseObject;
    }
}
