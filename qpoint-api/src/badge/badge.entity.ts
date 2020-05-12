import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('badge')
export class BadgeEntity {
    @PrimaryGeneratedColumn({name: 'badge_id'})
    badgeId: string;

}