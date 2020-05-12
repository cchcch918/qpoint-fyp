import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {GroupEntity} from "./group.entity";

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(GroupEntity) private groupRepository: Repository<GroupEntity>) {
    }
}