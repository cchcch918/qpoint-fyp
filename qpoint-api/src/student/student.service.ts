import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {StudentEntity} from "./student.entity";
import * as QRCode from 'qrcode'
import * as XLSX from 'xlsx';

import {CreateStudentDto, DeleteStudentDto, ShowStudentWithIdDto} from "./student.dto";
import {sendParentsLoginEmail} from "../utils/send-parents-account-login-email";
import {ParentEntity} from "../parent/parent.entity";
import {StudentBehaviourRecordService} from "../student-behaviour-record/student-behaviour-record.service";


@Injectable()
export class StudentService {
    constructor(@InjectRepository(StudentEntity) private studentRepository: Repository<StudentEntity>,
                @InjectRepository(ParentEntity) private parentRepository: Repository<ParentEntity>,
                private studentBehaviourRecordService: StudentBehaviourRecordService
    ) {
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
            newParent.password = this.generateRandomPasswordForParent(10);
            newParent.children = [student];
            await sendParentsLoginEmail(newParent, fullName, false);
            await this.parentRepository.save(newParent);
        }
        return student.toResponseObject();
    }

    async createNewStudentsFromExcel(payloads: any[]) {
        const promises: any[] = [];
        for (const payload of payloads) {
            const workSheet = XLSX.read(payload.buffer);
            const studentList: CreateStudentDto[] = XLSX.utils.sheet_to_json(workSheet.Sheets[workSheet.SheetNames[0]])
            studentList.forEach(student => {
                return promises.push(this.createNewStudent(student));
            })
        }
        return (await Promise.all(promises));
    }

    async showAllStudents() {
        const students = await this.studentRepository.find({relations: ['groups', 'class', 'parent']});
        const promises: any[] = [];
        for (const student of students) {
            const payload = {studentList: [student.studentId]}
            student['totalBehaviourPoint'] = (await this.studentBehaviourRecordService.getStudentsPoint(payload))[0]['totalBehaviourPoint'];
            promises.push(student);
        }
        return (await Promise.all(promises));
    }

    async showAllStudentsQrCode() {
        const students = await this.studentRepository.find({relations: ['groups', 'class', 'parent']});
        const promises: any[] = [];

        students.forEach(student => {
            promises.push(this.generateQrCode(student).then(res => {
                return {student: student, qrCode: res};
            }));
        });
        return (await Promise.all(promises));
    }

    async deleteStudent(payload: DeleteStudentDto) {
        const {studentId} = payload;
        const student = await this.studentRepository.findOne({where: {studentId: studentId}});
        if (!student) {
            throw new HttpException(
                'Student does not exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        await this.studentRepository.delete({studentId: studentId});
        return {deletedStudent: studentId};
    }

    async showStudentsWithId(payload: ShowStudentWithIdDto) {
        const {studentList} = payload;
        const students: StudentEntity[] = []
        for (const studentId of studentList) {
            students.push(await (this.studentRepository.findOne({where: {studentId: studentId},relations:['class']})).then(student => {
                if (!student) throw new HttpException(
                    `Behaviour with ID ${studentId} does not exists`,
                    HttpStatus.BAD_REQUEST,
                );
                return student;
            }));
        }
        return students;
    }

    async uploadStudentProfileImage(payload) {
        const {filename} = payload
        const studentId = filename.split('-')[0]
        const student = await this.studentRepository.findOne({where: {studentId: studentId}});
        if (!student) {
            throw new HttpException(
                'Student does not exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        student.profileImagePath = filename;
        await this.studentRepository.save(student);
        return {updatedStudentImage: studentId};
    }


    async generateQrCode(student: StudentEntity) {
        try {
            return await QRCode.toDataURL(JSON.stringify({
                studentId: student.studentId,
                studentName: student.fullName
            }));
        } catch (err) {
            console.error(err)
        }
    }

    generateRandomPasswordForParent(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

}