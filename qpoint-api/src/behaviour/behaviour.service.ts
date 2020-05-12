import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {BehaviourEntity} from "./behaviour.entity";

@Injectable()
export class BehaviourService {
    constructor(
        @InjectRepository(BehaviourEntity) private behaviourRepository: Repository<BehaviourEntity>) {
    }
}