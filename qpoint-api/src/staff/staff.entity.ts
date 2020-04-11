import {BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Entity('staff')
@Unique(["username"])

export class StaffEntity {
    @PrimaryGeneratedColumn({name: 'staff_id'})
    staffId: string;

    @CreateDateColumn({name: 'date_created'})
    dateCreated: Date;

    @Column()
    username: string;

    @Column()
    password: string;

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

    toResponseObject(): any {
        const {staffId, dateCreated, username, token} = this;
        const responseObject = {
            staffId, dateCreated, username, token
        };
        return responseObject;
    }
}