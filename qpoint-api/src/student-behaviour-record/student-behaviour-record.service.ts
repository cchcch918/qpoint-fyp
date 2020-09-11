import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {createQueryBuilder, Repository} from "typeorm";
import {StudentBehaviourRecordEntity} from "./student-behaviour-record.entity";
import {BehaviourEntity} from "../behaviour/behaviour.entity";
import {StudentEntity} from "../student/student.entity";
import {
    AddBehavioursToStudentsDto,
    DeleteStudentBehaviourRecordsDto,
    GetStudentBehaviourRecordsByClassDto,
    GetStudentBehaviourRecordsByGroupDto,
    GetStudentBehaviourRecordsbyStaffDto,
    GetStudentBehaviourRecordsDto,
    GetStudentPointDto,
    GetStudentRankingByClassDto,
    GetStudentRankingByGroupDto,
    UpdateStudentBehaviouralRecordsDto
} from "./student-behaviour-record.dto";
import {StaffEntity} from "../staff/staff.entity";
import {ClassEntity} from "../class/class.entity";
import {GroupEntity} from "../group/group.entity";

@Injectable()
export class StudentBehaviourRecordService {
    constructor(
        @InjectRepository(StudentBehaviourRecordEntity) private studentBehaviourRecordRepository: Repository<StudentBehaviourRecordEntity>,
        @InjectRepository(StudentEntity) private studentRepository: Repository<StudentEntity>,
        @InjectRepository(BehaviourEntity) private behaviourRepository: Repository<BehaviourEntity>,
        @InjectRepository(StaffEntity) private staffRepository: Repository<StaffEntity>,
        @InjectRepository(ClassEntity) private classRepository: Repository<ClassEntity>,
        @InjectRepository(GroupEntity) private groupRepository: Repository<GroupEntity>,
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

    async updateStudentBehaviouralRecords(payload: UpdateStudentBehaviouralRecordsDto) {
        const {recordId, behaviourId} = payload;
        const record = await this.studentBehaviourRecordRepository.findOne({
            where: {recordId: recordId},
            relations: ['behaviour']
        })
        if (!record) throw new HttpException(
            `Record with ID ${recordId} does not exist`,
            HttpStatus.BAD_REQUEST,
        );
        const newBehaviour = await this.behaviourRepository.findOne({
            where: {behaviourId: behaviourId}
        })
        if (!newBehaviour) throw new HttpException(
            `Behaviour with ID ${behaviourId} does not exist`,
            HttpStatus.BAD_REQUEST,
        );
        record.behaviour = newBehaviour;
        await this.studentBehaviourRecordRepository.save(record)
        return record;
    }

    async deleteStudentBehaviourRecords(payload: DeleteStudentBehaviourRecordsDto) {
        const {recordList} = payload;
        for (const recordId of recordList) {
            const record = await this.studentBehaviourRecordRepository.findOne({
                where: {recordId: recordId}
            })
            if (!record) throw new HttpException(
                `Record with ID ${recordId} does     not exist`,
                HttpStatus.BAD_REQUEST,
            );
            await this.studentBehaviourRecordRepository.delete({recordId: recordId});
        }
        return {deletedRecord: recordList}
    }

    async getStudentBehaviouralRecordsByStaff(payload: GetStudentBehaviourRecordsbyStaffDto) {
        const {staffId} = payload;
        const selectedStaff = await this.staffRepository.findOne({where: {staffId: staffId}});
        if (!selectedStaff) throw new HttpException(
            `Staff with ID ${staffId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );
        const behaviourRecords = await createQueryBuilder("StudentBehaviourRecordEntity")
            .leftJoinAndSelect("StudentBehaviourRecordEntity.student", "StudentEntity")
            .leftJoinAndSelect("StudentEntity.class", "ClassEntity")
            .leftJoinAndSelect("StudentBehaviourRecordEntity.behaviour", "BehaviourEntity")
            .where("StudentBehaviourRecordEntity.givenByTeacher = :givenByTeacher", {givenByTeacher: staffId}).getMany();
        return behaviourRecords;

    }

    async getStudentBehaviouralRecordsByClass(payload: GetStudentBehaviourRecordsByClassDto) {
        const {classId} = payload;
        const selectedClass = await this.classRepository.findOne({where: {classId: classId}});
        if (!selectedClass) throw new HttpException(
            `Class with ID ${classId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );
        const behaviourRecords = await createQueryBuilder("StudentBehaviourRecordEntity")
            .leftJoinAndSelect("StudentBehaviourRecordEntity.student", "StudentEntity")
            .leftJoinAndSelect("StudentBehaviourRecordEntity.behaviour", "BehaviourEntity")
            .where("StudentEntity.class.classId = :classId", {classId: classId}).getMany();
        return behaviourRecords;
    }

    async getStudentBehaviouralRecordsByGroup(payload: GetStudentBehaviourRecordsByGroupDto) {
        const {groupId} = payload;
        const selectedGroup = await this.groupRepository.findOne({where: {groupId: groupId}});
        if (!selectedGroup) throw new HttpException(
            `Group with ID ${groupId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );
        const behaviourRecords = await createQueryBuilder("StudentBehaviourRecordEntity")
            .leftJoinAndSelect("StudentBehaviourRecordEntity.student", "StudentEntity")
            .leftJoinAndSelect("StudentBehaviourRecordEntity.behaviour", "BehaviourEntity")
            .leftJoin("StudentEntity.groups", "GroupEntity")
            .where("GroupEntity.groupId = :groupId", {groupId: groupId}).getMany();
        return behaviourRecords;
    }

    async getStudentRankingByClass(payload: GetStudentRankingByClassDto) {
        const {classId, rankingNumber} = payload;
        const selectedClass = await this.classRepository.findOne({where: {classId: classId}});
        if (!selectedClass) throw new HttpException(
            `Class with ID ${classId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );
        const ranking = await createQueryBuilder("StudentBehaviourRecordEntity")
            .select("SUM(BehaviourEntity.behaviourPoint)", "totalBehaviourPoint")
            .addSelect("StudentEntity.studentId", "studentId")
            .addSelect("StudentEntity.fullName", "studentName")
            .leftJoin("StudentBehaviourRecordEntity.student", "StudentEntity")
            .leftJoin("StudentBehaviourRecordEntity.behaviour", "BehaviourEntity")
            .groupBy("StudentEntity.studentId")
            .orderBy("totalBehaviourPoint", "DESC")
            .having("totalBehaviourPoint > 0")
            .limit(rankingNumber)
            .where("StudentEntity.class.classId = :classId", {classId: classId}).getRawMany();
        return ranking;
    }


    async getStudentRankingByGroup(payload: GetStudentRankingByGroupDto) {
        const {groupId, rankingNumber} = payload;
        const selectedGroup = await this.groupRepository.findOne({where: {groupId: groupId}});
        if (!selectedGroup) throw new HttpException(
            `Group with ID ${groupId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );
        const ranking = await createQueryBuilder("StudentBehaviourRecordEntity")
            .select("SUM(BehaviourEntity.behaviourPoint)", "totalBehaviourPoint")
            .addSelect("StudentEntity.studentId", "studentId")
            .addSelect("StudentEntity.fullName", "studentName")
            .leftJoin("StudentBehaviourRecordEntity.student", "StudentEntity")
            .leftJoin("StudentBehaviourRecordEntity.behaviour", "BehaviourEntity")
            .leftJoin("StudentEntity.groups", "GroupEntity")
            .groupBy("StudentEntity.studentId")
            .orderBy("totalBehaviourPoint", "DESC")
            .having("totalBehaviourPoint > 0")
            .limit(rankingNumber)
            .where("GroupEntity.groupId = :groupId", {groupId: groupId}).getRawMany();
        return ranking;
    }
}