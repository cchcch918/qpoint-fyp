import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {StaffEntity} from "./staff.entity";
import {StaffLoginDto, StaffRegisterDto} from "./staff.dto";
import {sendEmail} from "../utils/send-forget-password-email";
import {AuthGuard} from "../utils/auth.guard";
import {AppConstant} from "../utils/constant/app.constant";

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
        const staff = await this.staffRepository.findOne({where: {username: username}});
        if (!staff) {
            throw new HttpException(
                'Invalid username',
                HttpStatus.BAD_REQUEST,
            );
        }
        if (!(await staff.comparePassword(password))) {
            throw new HttpException(
                'Invalid password',
                HttpStatus.BAD_REQUEST,
            );
        }
        return staff.toResponseObject();
    }

    async adminLogin(data: StaffLoginDto) {
        const {username, password} = data;
        const admin = await this.staffRepository.findOne({where: {username: username}});
        if (!admin) {
            throw new HttpException(
                'Invalid username',
                HttpStatus.BAD_REQUEST,
            );
        }
        if (!(await admin.comparePassword(password))) {
            throw new HttpException(
                'Invalid password',
                HttpStatus.BAD_REQUEST,
            );
        }
        if (admin.isAdmin !== AppConstant.IS_ADMIN || admin.isAdmin == null) {
            throw new HttpException(
                'Only admin is allow to login',
                HttpStatus.BAD_REQUEST,
            );
        }
        return admin.toResponseObject();
    }


    async adminRegister(data: StaffRegisterDto) {
        const {username} = data;
        let admin = await this.staffRepository.findOne({where: {username}});
        if (admin) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        admin = await this.staffRepository.create(data);
        admin.isAdmin = AppConstant.IS_ADMIN
        await this.staffRepository.save(admin);
        return admin.toResponseObject();
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