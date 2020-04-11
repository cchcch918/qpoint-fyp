import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity('test')
export class TestEntity {

    @PrimaryGeneratedColumn({name: 'test_id'})
    testId?: number;

    @CreateDateColumn({name: 'full_name'})
    fullName: string;

    @Column('date')
    birthday: Date;

    @Column({name: 'is_active'})
    isActive: string;

}
