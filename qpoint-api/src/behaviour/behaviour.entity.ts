import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {StaffEntity} from "../staff/staff.entity";

@Entity('behaviour')
export class BehaviourEntity {
    @PrimaryGeneratedColumn({name: 'behaviour_id'})
    behaviourId: number;

    @Column({name: 'behaviour_name'})
    behaviourName: string;

    @CreateDateColumn({name: 'date_created'})
    dateCreated: Date;

    @Column({name: 'behaviour_point'})
    behaviourPoint: number;

    @ManyToOne(type => StaffEntity)
    @JoinColumn({name: 'created_by_admin'})
    createdByAdmin: StaffEntity;

    toResponseObject(): any {
        const {behaviourId, dateCreated, behaviourName, behaviourPoint, createdByAdmin} = this;
        const responseObject = {
            behaviourId, dateCreated, behaviourName, behaviourPoint, createdByAdmin
        };
        return responseObject;
    }
}

