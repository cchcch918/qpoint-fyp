import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ParentEntity} from "./parent.entity";
import {AuthGuard} from "../utils/auth.guard";
import {ParentChangePasswordDto, ParentLoginDto} from "./parent.dto";
import {AppConstant} from "../utils/constant/app.constant";

@Injectable()
export class ParentService {
    constructor(
        @InjectRepository(ParentEntity) private parentRepository: Repository<ParentEntity>,
        private authGuard: AuthGuard) {
    }

    async getParentAccountDetails(payload: any) {
        const {token} = payload;
        return await this.authGuard.validateToken(token);
    }

    async parentLogin(payload: ParentLoginDto) {
        const {parentEmail, password, deviceId, devicePlatform} = payload;
        const parent = await this.parentRepository.findOne({where: {email: parentEmail}, relations: ['children']});
        if (!parent || !(await parent.comparePassword(password))) {
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST,
            );
        }
        //register device for notification
        if (deviceId != null && devicePlatform != null) {
            if ((devicePlatform !== AppConstant.DEVICE_ANDROID && devicePlatform !== AppConstant.DEVICE_IOS)) {
                throw new HttpException(
                    'Invalid device platform',
                    HttpStatus.BAD_REQUEST,
                );
            }
            parent.deviceId = deviceId;
            parent.devicePlatform = devicePlatform;
            await this.parentRepository.save(parent);
        }


        return parent.toResponseObject();
    }

    async showParentDetails(payload: ParentLoginDto) {
        const {parentEmail} = payload;
        const parent = await this.parentRepository.findOne({where: {email: parentEmail}, relations: ['children']},
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
        const parent = await this.parentRepository.findOne({where: {email: parentEmail}, relations: ['children']});
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