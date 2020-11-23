import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {createQueryBuilder, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {StaffEntity} from "./staff.entity";
import {
    AdminRegisterDto,
    DateFilterDto,
    DeleteStaffDto,
    ShowClassWithStaffIdDto,
    StaffLoginDto,
    StaffRegisterDto
} from "./staff.dto";
import {sendEmail} from "../utils/send-forget-password-email";
import {AuthGuard} from "../utils/auth.guard";
import {AppConstant} from "../utils/constant/app.constant";
import {sendStaffLoginEmail} from "../utils/send-staff-account-login-email";
import {StudentBehaviourRecordEntity} from "../student-behaviour-record/student-behaviour-record.entity";
import {BehaviourEntity} from "../behaviour/behaviour.entity";

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(StaffEntity) private staffRepository: Repository<StaffEntity>,
        @InjectRepository(StudentBehaviourRecordEntity) private studentBehaviourRecordRepository: Repository<StudentBehaviourRecordEntity>,
        @InjectRepository(BehaviourEntity) private behaviourEntity: Repository<BehaviourEntity>,
        private authGuard: AuthGuard) {
    }

    async showAllStaffs() {
        const staffs = await this.staffRepository.find({relations: ['classes', 'groups']});
        if (!staffs) {
            throw new HttpException(
                'Staff does not exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        return staffs;
    }

    async checkStaffExists(username: string) {
        const exists = await this.staffRepository.findOne({
                where: [{"username": username}]
            }
        );
        return exists != null ? {"result": true} : {"result": false};
    }

    async getStaffDetailsByStaffId(payload) {
        const {staffId} = payload;
        const staff = await this.staffRepository.findOne({
            where: {staffId: staffId},
            relations: ['classes', 'groups'],
        });
        if (!staff) {
            throw new HttpException(
                'Staff does not exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        return staff;
    }

    async getAdminAccountDetails(payload: any) {
        const {token} = payload;
        return await this.authGuard.validateToken(token);
    }

    async staffLogin(data: StaffLoginDto) {
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


    async adminRegister(data: AdminRegisterDto) {
        const {username} = data;
        let admin = await this.staffRepository.findOne({where: {username}});
        if (admin) {
            throw new HttpException('Admin already exists', HttpStatus.BAD_REQUEST);
        }
        admin = await this.staffRepository.create(data);
        admin.isAdmin = AppConstant.IS_ADMIN
        await this.staffRepository.save(admin);
        return admin.toResponseObject();
    }

    async staffRegister(payload: StaffRegisterDto) {
        const {username, email} = payload;
        const admin = await this.staffRepository.findOne({where: {username}});
        if (admin) {
            throw new HttpException('Staff already exists', HttpStatus.BAD_REQUEST);
        }
        const newStaff = await this.staffRepository.create({"username": username});
        newStaff.email = email;
        newStaff.password = this.generateRandomPasswordForStaff(10);
        await sendStaffLoginEmail(newStaff);
        await this.staffRepository.save(newStaff);
        return newStaff.toResponseObject();
    }

    async deleteStaff(payload: DeleteStaffDto) {
        const {staffId} = payload;
        const thisStaff = await this.staffRepository.findOne({where: {staffId: staffId}, relations: ['groups']});
        console.log(thisStaff);
        if (!thisStaff) throw new HttpException(
            `Staff ${staffId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );
        if (thisStaff.isAdmin === AppConstant.IS_ADMIN) throw new HttpException(
            `Admin cant be deleted`,
            HttpStatus.BAD_REQUEST,
        );
        thisStaff.groups = null;
        await this.staffRepository.save(thisStaff);
        await this.staffRepository.delete({staffId: staffId});
        return {deletedStaff: staffId};
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

    async showClassWithStaffId(payload: ShowClassWithStaffIdDto) {
        const {staffId} = payload;
        const classes = await this.staffRepository.findOne({
            where: {staffId: staffId},
            relations: ['classes']
        })
        if (!classes) throw new HttpException(
            `Staff with ID ${staffId} does not exist`,
            HttpStatus.BAD_REQUEST,
        )
        return classes
    }

    async getTeachersActivitiesList(payload: DateFilterDto) {
        const {dateFilter, sortBy} = payload


        const date = new Date();
        let startDate;

        switch (dateFilter) {
            case "1Y":
                startDate = new Date(date.getFullYear(), 0, 1)
                break;

            case "1D":
                startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0)
                break;

            case "7D":
                startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                break;

            case "1M":
                startDate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())
                break;

            case "2M":
                startDate = new Date(date.getFullYear(), date.getMonth() - 2, date.getDate())
                break;

            case "3M":
                startDate = new Date(date.getFullYear(), date.getMonth() - 3, date.getDate())
                break;

            default:
                startDate = new Date(date.getFullYear(), 0, 1)
        }
        const startDateISO = startDate.toISOString();
        let orderByCondition, order;
        switch (sortBy) {
            case "id":
                orderByCondition = "StaffEntity.staffId";
                order = "ASC"
                break;

            case "name":
                orderByCondition = "StaffEntity.username";
                order = "ASC"
                break;

            case "scanCount":
                orderByCondition = "scanCount";
                order = "DESC"
                break;

            case "pointsAwarded":
                orderByCondition = "pointsAwarded";
                order = "DESC"
                break;

            default:
        }


        const teachersActivities: any[] = await createQueryBuilder("StaffEntity")
            .select("StaffEntity.staffId", "staffId")
            .addSelect("StaffEntity.username", "username")
            .addSelect("StaffEntity.isAdmin", "isAdmin")
            .addSelect("COUNT(StudentBehaviourRecordEntity.recordId)", "scanCount")
            .addSelect("SUM(BehaviourEntity.behaviourPoint)", "pointsAwarded")
            .leftJoin("StaffEntity.records", "StudentBehaviourRecordEntity")
            .leftJoin("StudentBehaviourRecordEntity.behaviour", "BehaviourEntity")
            .groupBy("StaffEntity.staffId")
            .where("StudentBehaviourRecordEntity.dateGiven > :startDate", {startDate: startDateISO})
            .orderBy(orderByCondition, order)
            .getRawMany();
        return teachersActivities;
    }

    generateRandomPasswordForStaff(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }


}