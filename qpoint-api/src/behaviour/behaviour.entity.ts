import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('behaviour')
export class BehaviourEntity {
    @PrimaryGeneratedColumn({name: 'behaviour_id'})
    behaviourId: string;
}