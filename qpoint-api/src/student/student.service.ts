import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {StudentEntity} from "./student.entity";
import * as QRCode from 'qrcode'
import {CreateStudentDto} from "./student.dto";
import {sendParentsLoginEmail} from "../utils/send-parents-account-login-email";
import {ParentEntity} from "../parent/parent.entity";


@Injectable()
export class StudentService {
    constructor(@InjectRepository(StudentEntity) private studentRepository: Repository<StudentEntity>,
                @InjectRepository(ParentEntity) private parentRepository: Repository<ParentEntity>) {
    }


    async createNewStudent(payload: CreateStudentDto) {
        const {fullName, parentEmail} = payload;

        const student = await this.studentRepository.create({"fullName": fullName});
        const parent = await this.parentRepository.findOne({where: {email: parentEmail}});
        if (parent) {
            student.parent = parent;
            await sendParentsLoginEmail(parent, fullName, true);
            await this.studentRepository.save(student);
            return student.toResponseObject();

        } else {
            const newParent = new ParentEntity();
            newParent.email = parentEmail;
            newParent.password = this.generateRandomPasswordBasedOnName(10);
            newParent.children = [student];
            await sendParentsLoginEmail(newParent, fullName, false);
            await this.parentRepository.save(newParent);
            const newStudent = await this.studentRepository.findOne({where: {parentEmail}, relations: ['parent']});
            return newStudent.toResponseObject();
        }
    }

    async showAllStudentsQrCode() {
        const students = await this.studentRepository.find();
        const promises: any[] = [];

        students.forEach(student => {
            promises.push(this.generateQrCode(student).then(res => {
                return {studentName: student.fullName, qrCode: res};
            }));
        });
        return (await Promise.all(promises));
    }

    async generateQrCode(student: StudentEntity) {
        try {
            return await QRCode.toDataURL(JSON.stringify({
                "studentId": student.studentId.toString(),
                "studentName": student.fullName
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