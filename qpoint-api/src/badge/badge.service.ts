import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {BadgeEntity} from "./badge.entity";

@Injectable()
export class BadgeService {
    constructor(
        @InjectRepository(BadgeEntity) private badgeRepository: Repository<BadgeEntity>) {
    }
}