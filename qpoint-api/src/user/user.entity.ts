import {BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn({name: 'user_id'})
    userId: string;

    @CreateDateColumn({name: 'date_created'})
    dateCreated: Date;

    @Column()
    password: string;

    @Column({name: 'full_name'})
    fullName: string;

    @Column({name: 'parent_email', unique: true})
    parentEmail: string;

    private get token(): string {
        const {userId, parentEmail} = this;
        return jwt.sign(
            {
                userId, parentEmail,
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
        const {userId, dateCreated, password, fullName, parentEmail, token} = this;
        const responseObject = {
            userId, dateCreated, password, fullName, parentEmail, token
        };
        return responseObject;
    }
}