import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Test {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column('date')
    birthday: Date;

    @Column()
    is_active: string;

}
