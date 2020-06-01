import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {BehaviourEntity} from "./behaviour.entity";
import {CreateBehaviourDto, DeleteBehaviourDto, UpdateBehaviourDto} from "./behaviour.dto";
import {StaffEntity} from "../staff/staff.entity";

@Injectable()
export class BehaviourService {
    constructor(
        @InjectRepository(BehaviourEntity) private behaviourRepository: Repository<BehaviourEntity>,
        @InjectRepository(StaffEntity) private staffRepository: Repository<StaffEntity>) {
    }

    async createNewBehaviour(payload: CreateBehaviourDto) {
        const {behaviourName, createdByAdminId, behaviourPoint} = payload;
        const admin = await this.staffRepository.findOne({where: {staffId: createdByAdminId}});
        if (!admin) {
            throw new HttpException(
                'Admin does not exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        const newBehaviour = await this.behaviourRepository.create({"behaviourName": behaviourName});
        newBehaviour.createdByAdmin = admin;
        newBehaviour.behaviourPoint = behaviourPoint;
        await this.behaviourRepository.save(newBehaviour);
        return newBehaviour.toResponseObject();
    }

    async showAllBehaviours() {
        const behaviours = await this.behaviourRepository.find({relations: ['createdByAdmin']});
        return behaviours;
    }

    async deleteBehaviour(payload: DeleteBehaviourDto) {
        const {behaviourId} = payload;
        const behaviour = await this.behaviourRepository.findOne({where: {behaviourId: behaviourId}});
        if (!behaviour) {
            throw new HttpException(
                'Behaviour does not exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        await this.behaviourRepository.delete({behaviourId: behaviourId});
        return {deletedBehaviour: behaviourId};
    }

    async updateBehaviour(payload: UpdateBehaviourDto) {
        const {behaviourId, behaviourName, behaviourPoint} = payload;
        const behaviour = await this.behaviourRepository.findOne({where: {behaviourId: behaviourId}});
        if (!behaviour) {
            throw new HttpException(
                'Behaviour does not exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        behaviour.behaviourName = behaviourName;
        behaviour.behaviourPoint = behaviourPoint;
        await this.behaviourRepository.save(behaviour);
        return behaviour.toResponseObject();
    }

}