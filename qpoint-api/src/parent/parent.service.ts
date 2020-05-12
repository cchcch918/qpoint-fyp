import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ParentEntity} from "./parent.entity";
import {ParentChangePasswordDto, ParentLoginDto} from "./parent.dto";

@Injectable()
export class ParentService {
    constructor(
        @InjectRepository(ParentEntity) private parentRepository: Repository<ParentEntity>) {
    }

    async parentLogin(payload: ParentLoginDto) {
        const {parentEmail, password} = payload;
        const parent = await this.parentRepository.findOne({where: {parentEmail}, relations: ['children']});
        if (!parent || !(await parent.comparePassword(password))) {
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST,
            );
        }
        return parent.toResponseObject();
    }

    async showParentDetails(payload: ParentLoginDto) {
        const {parentEmail} = payload;
        const parent = await this.parentRepository.findOne({where: {parentEmail}, relations: ['children']},
        );
        if (!parent) {
            throw new HttpException(
                'No parent exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        return parent.toResponseObject();
    }

    async changeParentPassword(payload: ParentChangePasswordDto) {
        const {parentEmail, oldPassword, newPassword} = payload;
        const parent = await this.parentRepository.findOne({where: {parentEmail}, relations: ['children']});
        if (!parent || !(await parent.comparePassword(oldPassword))) {
            throw new HttpException(
                'Old password is invalid',
                HttpStatus.BAD_REQUEST,
            );
        }
        parent.password = newPassword;
        await parent.hashPassword();
        await this.parentRepository.update(parent.parentId, {password: parent.password});
        return {result: "SUCCESS"};
    }

}