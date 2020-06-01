import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {StudentBehaviourRecordEntity} from "./student-behaviour-record.entity";
import {BehaviourEntity} from "../behaviour/behaviour.entity";
import {StudentEntity} from "../student/student.entity";
import {
    AddBehavioursToStudentsDto,
    GetStudentBehaviourRecordsDto,
    GetStudentPointDto
} from "./student-behaviour-record.dto";
import {StaffEntity} from "../staff/staff.entity";

@Injectable()
export class StudentBehaviourRecordService {
    constructor(
        @InjectRepository(StudentBehaviourRecordEntity) private studentBehaviourRecordRepository: Repository<StudentBehaviourRecordEntity>,
        @InjectRepository(StudentEntity) private studentRepository: Repository<StudentEntity>,
        @InjectRepository(BehaviourEntity) private behaviourRepository: Repository<BehaviourEntity>,
        @InjectRepository(StaffEntity) private staffRepository: Repository<StaffEntity>,
    ) {
    }

    async addBehavioursToStudents(payload: AddBehavioursToStudentsDto) {
        const {behaviourList, studentList, staffId} = payload;

        const teacher = await this.staffRepository.findOne({where: {staffId: staffId}});
        if (!teacher) throw new HttpException(
            `Teacher with ID ${staffId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );

        const behaviours: BehaviourEntity[] = []
        for (const behaviourId of behaviourList) {
            behaviours.push(await (this.behaviourRepository.findOne({where: {behaviourId: behaviourId}})).then(behaviour => {
                if (!behaviour) throw new HttpException(
                    `Behaviour with ID ${behaviourId} does not exists`,
                    HttpStatus.BAD_REQUEST,
                );
                return behaviour;
            }));
        }
        const records: StudentBehaviourRecordEntity[] = []
        for (const studentId of studentList) {
            await (this.studentRepository.findOne({where: {studentId: studentId}})).then(student => {
                if (!student) throw new HttpException(
                    `Student with ID ${studentId} does not exists`,
                    HttpStatus.BAD_REQUEST,
                );
                for (const behaviour of behaviours) {
                    const newRecord = this.studentBehaviourRecordRepository.create({
                        "student": student,
                        "behaviour": behaviour,
                        "givenByTeacher": teacher
                    });

                    this.studentBehaviourRecordRepository.save(newRecord);
                    records.push(newRecord);
                }
            });
        }
        return records;

    }

    async getStudentsPoint(payload: GetStudentPointDto) {
        const {studentList} = payload;
        const students: StudentEntity[] = []
        for (const studentId of studentList) {
            const student = await this.studentRepository.findOne({where: {studentId: studentId}});
            if (!student) throw new HttpException(
                `Student with ID ${studentId} does not exists`,
                HttpStatus.BAD_REQUEST,
            );
            const behaviourRecords = await this.studentBehaviourRecordRepository.find({
                where: {student: student},
                relations: ['behaviour', 'student']
            });
            student['totalBehaviourPoint'] = behaviourRecords.reduce((currentTotal, record) => {
                return record.behaviour.behaviourPoint + currentTotal
            }, 0);
            students.push(student)
        }
        return students;
    }

    async getStudentBehaviouralRecords(payload: GetStudentBehaviourRecordsDto) {
        const {studentId} = payload;
        const student = await this.studentRepository.findOne({where: {studentId: studentId}});
        if (!student) throw new HttpException(
            `Student with ID ${studentId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );

        const behaviourRecords = await this.studentBehaviourRecordRepository.find({
            where: {student: student},
            relations: ['behaviour', 'givenByTeacher']
        })
        return behaviourRecords;
    }
}