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
    GetStudentBehaviourRecordsByStaffDto,
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
        const {behaviourId, studentId, staffId, imageUri} = payload

        const teacher = await this.staffRepository.findOne({where: {staffId: staffId}});
        if (!teacher) throw new HttpException(
            `Teacher with ID ${staffId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );

        const behaviour = await this.behaviourRepository.findOne({where: {behaviourId: behaviourId}});
        if (!behaviour) throw new HttpException(
            `Behaviour with ID ${behaviourId} does not exists`,
            HttpStatus.BAD_REQUEST
        )

        const student = await this.studentRepository.findOne({where: {studentId: studentId}});
        if (!student) throw new HttpException(
            `Student with ID ${studentId} does not exists`,
            HttpStatus.BAD_REQUEST
        )

        let newRecord = null

        if (imageUri) {
            newRecord = await this.studentBehaviourRecordRepository.create({
                "student": student,
                "behaviour": behaviour,
                "givenByTeacher": teacher,
                "imageUri": imageUri
            })
            this.studentBehaviourRecordRepository.save(newRecord)
        } else {
            newRecord = await this.studentBehaviourRecordRepository.create({
                "student": student,
                "behaviour": behaviour,
                "givenByTeacher": teacher,
                "imageUri": null
            })
            this.studentBehaviourRecordRepository.save(newRecord)
        }
        return newRecord
    }

    async getStudentsPoint(payload: GetStudentPointDto) {
        const {studentList} = payload;
        const students: StudentEntity[] = []
        for (const studentId of studentList) {
            const student = await this.studentRepository.findOne({where: {studentId: studentId}, relations: ['class']});
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
        const {recordId, behaviourId, imageUri} = payload;
        const record = await this.studentBehaviourRecordRepository.findOne({
            where: {recordId: recordId},
            relations: ['behaviour']
        })
        if (!record) throw new HttpException(
            `Record with ID ${recordId} does not exist`,
            HttpStatus.BAD_REQUEST,
        );
        if (behaviourId) {
            const newBehaviour = await this.behaviourRepository.findOne({
                where: {behaviourId: behaviourId}
            })
            if (!newBehaviour) throw new HttpException(
                `Behaviour with ID ${behaviourId} does not exist`,
                HttpStatus.BAD_REQUEST,
            );
            record.behaviour = newBehaviour;
        }
        record.imageUri = imageUri
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
                `Record with ID ${recordId} does not exist`,
                HttpStatus.BAD_REQUEST,
            );
            await this.studentBehaviourRecordRepository.delete({recordId: recordId});
        }
        return {deletedRecord: recordList}
    }

    async getStudentBehaviouralRecordsByStaff(payload: GetStudentBehaviourRecordsByStaffDto) {
        const {staffId, dateFilter} = payload;
        const selectedStaff = await this.staffRepository.findOne({where: {staffId: staffId}});
        if (!selectedStaff) throw new HttpException(
            `Staff with ID ${staffId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );

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
                startDate = new Date(2020, 0, 1)
        }
        const startDateISO = startDate.toISOString();

        const behaviourRecords = await createQueryBuilder("StudentBehaviourRecordEntity")
            .leftJoinAndSelect("StudentBehaviourRecordEntity.student", "StudentEntity")
            .leftJoinAndSelect("StudentEntity.class", "ClassEntity")
            .leftJoinAndSelect("StudentBehaviourRecordEntity.behaviour", "BehaviourEntity")
            .where("StudentBehaviourRecordEntity.givenByTeacher = :givenByTeacher", {givenByTeacher: staffId})
            .andWhere("StudentBehaviourRecordEntity.dateGiven > :startDate", {startDate: startDateISO})
            .getMany();
        return behaviourRecords;

    }

    async getTodayRecordDetails() {
        const date = new Date();

        //today date
        const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0)
        const startDateISO = startDate.toISOString();

        const todayRecords: any[] = await createQueryBuilder("StudentBehaviourRecordEntity")
            .select("StudentBehaviourRecordEntity", "todayRecords")
            .leftJoinAndSelect("StudentBehaviourRecordEntity.behaviour", "BehaviourEntity")
            .where("StudentBehaviourRecordEntity.dateGiven > :startDate", {startDate: startDateISO})
            .getMany();


        const result: any = await createQueryBuilder("StudentBehaviourRecordEntity")
            .leftJoin("StudentBehaviourRecordEntity.behaviour", "BehaviourEntity")
            .addSelect("BehaviourEntity.behaviourName", "BehaviourName")
            .addSelect("COUNT(BehaviourEntity.behaviourId)", "BehaviourCount")
            .groupBy("BehaviourEntity.behaviourId")
            .where("StudentBehaviourRecordEntity.dateGiven > :startDate", {startDate: startDateISO})
            .orderBy("BehaviourCount", 'DESC')
            .getRawOne();

        const positivePoints = todayRecords.filter(record => {
            return record.behaviour.behaviourPoint > 0;
        }).reduce((currentTotal, record) => {
            return record.behaviour.behaviourPoint + currentTotal
        }, 0);

        const negativePoints = todayRecords.filter(record => {
            return record.behaviour.behaviourPoint < 0;
        }).reduce((currentTotal, record) => {
            return record.behaviour.behaviourPoint + currentTotal
        }, 0);

        return {
            todayRecordsCount: todayRecords.length,
            positivePoints: positivePoints,
            negativePoints: negativePoints,
            highlightedBehaviour: result.BehaviourName
        }
    }

    async getOverallStudentBehaviourRecords() {
        const behaviourRecords = await createQueryBuilder("StudentBehaviourRecordEntity")
            .leftJoinAndSelect("StudentBehaviourRecordEntity.student", "StudentEntity")
            .leftJoinAndSelect("StudentBehaviourRecordEntity.behaviour", "BehaviourEntity")
            .limit(50)
            .orderBy("StudentBehaviourRecordEntity.dateGiven", 'DESC')
            .getMany();

        return behaviourRecords;
    }

    async getOverallRanking() {
        const studentRanking = await createQueryBuilder("StudentBehaviourRecordEntity")
            .select("SUM(BehaviourEntity.behaviourPoint)", "totalBehaviourPoint")
            .addSelect("StudentEntity.studentId", "studentId")
            .addSelect("StudentEntity.fullName", "name")
            .leftJoin("StudentBehaviourRecordEntity.student", "StudentEntity")
            .leftJoin("StudentBehaviourRecordEntity.behaviour", "BehaviourEntity")
            .groupBy("StudentEntity.studentId")
            .orderBy("totalBehaviourPoint", "DESC")
            .having("totalBehaviourPoint > 0")
            .limit(5)
            .getRawMany();

        const groupRanking = await createQueryBuilder("StudentBehaviourRecordEntity")
            .select("SUM(BehaviourEntity.behaviourPoint)", "totalBehaviourPoint")
            .addSelect("GroupEntity.groupId", "groupId")
            .addSelect("GroupEntity.groupName", "name")
            .leftJoin("StudentBehaviourRecordEntity.student", "StudentEntity")
            .leftJoin("StudentBehaviourRecordEntity.behaviour", "BehaviourEntity")
            .innerJoin("StudentEntity.groups", "GroupEntity")
            .groupBy("GroupEntity.groupId")
            .orderBy("totalBehaviourPoint", "DESC")
            .having("totalBehaviourPoint > 0")
            .limit(5)
            .getRawMany();

        const classRanking = await createQueryBuilder("StudentBehaviourRecordEntity")
            .select("SUM(BehaviourEntity.behaviourPoint)", "totalBehaviourPoint")
            .addSelect("ClassEntity.classId", "classId")
            .addSelect("ClassEntity.className", "name")
            .leftJoin("StudentBehaviourRecordEntity.student", "StudentEntity")
            .leftJoin("StudentBehaviourRecordEntity.behaviour", "BehaviourEntity")
            .innerJoin("StudentEntity.class", "ClassEntity")
            .groupBy("ClassEntity.classId")
            .orderBy("totalBehaviourPoint", "DESC")
            .having("totalBehaviourPoint > 0")
            .limit(5)
            .getRawMany();


        return {
            studentRanking: studentRanking,
            groupRanking: groupRanking,
            classRanking: classRanking,
        };
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