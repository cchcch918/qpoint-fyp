import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity('test')
export class TestEntity {

    @PrimaryGeneratedColumn({name: 'test_id'})
    testId?: number;

    @Column({name: 'full_name'})
    fullName: string;

    @CreateDateColumn()
    birthday: Date;

    @Column({name: 'is_active'})
    isActive: string;
}
