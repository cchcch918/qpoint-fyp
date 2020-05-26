import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {StaffEntity} from "./staff.entity";
import {StaffLoginDto, StaffRegisterDto} from "./staff.dto";
import {sendEmail} from "../utils/send-forget-password-email";
import {AuthGuard} from "../utils/auth.guard";

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(StaffEntity) private staffRepository: Repository<StaffEntity>,
        private authGuard: AuthGuard) {
    }

    async showAllStaffs() {
        const users = await this.staffRepository.find();
        return users;
    }

    async checkStaffExists(username: string) {
        const exists = await this.staffRepository.findOne({
                where: [{"username": username}]
            }
        );
        return exists != null ? {"result": true} : {"result": false};
    }

    // async read(username: string) {
    //     const user = await this.staffRepository.findOne({
    //         where: {username},
    //         relations: ['ideas', 'bookmarks'],
    //     });
    //     return user.toResponseObject();
    // }

    async getAdminAccountDetails(payload: any) {
        const {token} = payload;
        return await this.authGuard.validateToken(token);
    }

    async login(data: StaffLoginDto) {
        const {username, password} = data;
        const user = await this.staffRepository.findOne({where: {username}});
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST,
            );
        }
        return user.toResponseObject();
    }

    async register(data: StaffRegisterDto) {
        const {username} = data;
        let user = await this.staffRepository.findOne({where: {username}});
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        user = await this.staffRepository.create(data);
        await this.staffRepository.save(user);
        return user.toResponseObject();
    }


    async changePassword(payload) {
        const {username, password} = payload;
        const user = await this.staffRepository.findOne({where: {username}});
        if (!user) {
            throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
        }
        user.password = password;
        await user.hashPassword();
        await this.staffRepository.update(user.staffId, {password: user.password});
        return {result: "SUCCESS"};
    }

    async sendForgetPasswordEmail(payload) {
        const {username} = payload;
        const user = await this.staffRepository.findOne({where: {username}});
        if (!user) {
            throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
        }
        await user.generateResetPasswordToken();
        await this.staffRepository.save(user);
        return await sendEmail(user);
    }

    async getAccountDetailsByUsername(username: string) {
        const user = await this.staffRepository.findOne({where: {username}});
        if (!user) {
            throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
        }
        return user.toResponseObject();
    }

    async verifyPasswordResetToken(payload: any) {
        const {username, token} = payload;
        const user = await this.staffRepository.findOne({where: {username}});
        if (!user) {
            throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
        }

        if (token === user.resetPasswordToken) {
            if (new Date > user.resetPasswordExpires) {
                throw new HttpException('Password reset token has expired.', HttpStatus.BAD_REQUEST);
            } else {
                user.resetPasswordToken = null;
                user.resetPasswordExpires = null;
                await this.staffRepository.save(user);
                return {result: "SUCCESS"}
            }
        } else {
            throw new HttpException('Password reset token is invalid.', HttpStatus.BAD_REQUEST);
        }
    }


}