import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "./user.entity";
import * as QRCode from 'qrcode'
import {CreateStudentDto, ParentLoginDto} from "./user.dto";
import {sendParentsLoginEmail} from "../utils/send-parents-account-login-email";


@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {
    }


    async createNewStudent(payload: CreateStudentDto) {
        const {fullName, parentEmail} = payload;

        // let user = await this.userRepository.findOne({where: {fullName}});
        // if (user) {
        //     throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        // }
        const student = await this.userRepository.create(payload);
        student.password = this.generateRandomPasswordBasedOnName(10);
        await sendParentsLoginEmail(student);
        await this.userRepository.save(student);
        return student.toResponseObject();
    }

    async showAllStudentsQrCode() {
        const users = await this.userRepository.find();
        const promises: any[] = [];

        users.forEach(user => {
            promises.push(this.generateQrCode(user).then(res => {
                return {studentName: user.fullName, qrCode: res};
            }));
        });
        return (await Promise.all(promises));
    }

    async parentLogin(data: ParentLoginDto) {
        const {parentEmail, password} = data;
        const user = await this.userRepository.findOne({where: {parentEmail}});
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST,
            );
        }
        return user.toResponseObject();
    }

    async generateQrCode(user: UserEntity) {
        try {
            return await QRCode.toDataURL(JSON.stringify({
                "userId": user.userId.toString(),
                "studentName": user.fullName
            }));
        } catch (err) {
            console.error(err)
        }
    }

    generateRandomPasswordBasedOnName(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

}