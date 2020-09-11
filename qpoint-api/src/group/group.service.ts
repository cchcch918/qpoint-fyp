import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {GroupEntity} from "./group.entity";
import {StaffEntity} from "../staff/staff.entity";
import {StudentEntity} from "../student/student.entity";
import {
    CreateGroupDto,
    DeleteGroupDto,
    GroupRemoveStudentsDto,
    GroupRemoveTeacherDto,
    GroupUpdateStudentsDto,
    GroupUpdateTeacherDto
} from "./group.dto";

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(GroupEntity) private groupRepository: Repository<GroupEntity>,
        @InjectRepository(StaffEntity) private staffRepository: Repository<StaffEntity>,
        @InjectRepository(StudentEntity) private studentRepository: Repository<StudentEntity>,
    ) {
    }

    async showAllGroups() {
        const groups = await this.groupRepository.find({relations: ['students', 'teacher']});
        return groups;
    }

    async createNewGroup(payload: CreateGroupDto) {
        const {groupName, createdByAdminId} = payload;
        const admin = await this.staffRepository.findOne({where: {staffId: createdByAdminId}});
        if (!admin) {
            throw new HttpException(
                'Admin does not exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        const newGroup = await this.groupRepository.create({"groupName": groupName});
        newGroup.createdByAdmin = admin;
        await this.groupRepository.save(newGroup);
        return newGroup.toResponseObject();
    }

    async deleteGroup(payload: DeleteGroupDto) {
        const {groupId} = payload;
        const thisGroup = await this.groupRepository.findOne({where: {groupId: groupId}, relations: ['students']});
        if (!thisGroup) throw new HttpException(
            `Group ${groupId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );
        // if (thisGroup.students) {
        //     const students: StudentEntity[] = thisClass.students;
        //     for (const student of students) {
        //         await this.studentRepository.update(student.studentId, {class: null});
        //     }
        // }
        await this.groupRepository.delete({groupId: groupId});
        return {deletedGroup: groupId};
    }

    async groupUpdateStudents(payload: GroupUpdateStudentsDto) {
        const {groupId, studentIdList} = payload;
        const students: StudentEntity[] = [];
        for (const studentId of studentIdList) {
            students.push(await (this.studentRepository.findOne({where: {studentId: studentId}})).then(res => {
                if (!res) throw new HttpException(
                    `Student with ID ${studentId} does not exists`,
                    HttpStatus.BAD_REQUEST,
                );
                return res;
            }));
        }

        const thisGroup = await this.groupRepository.findOne({where: {groupId: groupId}, relations: ['students']});
        if (!thisGroup) throw new HttpException(
            `Group ${groupId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );
        thisGroup.students = students;
        await this.groupRepository.save(thisGroup)
        return thisGroup.toResponseObject();
    }

    async groupRemoveStudents(payload: GroupRemoveStudentsDto) {
        const {groupId, studentIdList} = payload;
        const thisGroup = await this.groupRepository.findOne({where: {groupId: groupId}, relations: ['students']});
        if (!thisGroup) throw new HttpException(
            `Group ${groupId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );
        for (const studentId of studentIdList) {
            if (!thisGroup.students.some(student => {
                return +student.studentId === +studentId;
            })) {
                throw new HttpException(
                    `Student ${studentId} does not exists`,
                    HttpStatus.BAD_REQUEST,
                );
            }
            thisGroup.students = thisGroup.students.filter(student => {
                return student.studentId != studentId;
            })
        }
        await this.groupRepository.save(thisGroup)
        return {removedStudents: studentIdList};
    }

    async groupUpdateTeacher(payload: GroupUpdateTeacherDto) {
        const {groupId, teacherId} = payload;
        let teacher = null;
        if (teacherId != null) {
            teacher = await this.staffRepository.findOne({where: {staffId: teacherId}});
            if (!teacher) throw new HttpException(
                `Teacher with ID ${teacherId} does not exists`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const thisGroup = await this.groupRepository.findOne({where: {groupId: groupId}, relations: ['teacher']});
        if (!thisGroup) throw new HttpException(
            `Group ${groupId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );
        thisGroup.teacher = teacher;
        await this.groupRepository.save(thisGroup)
        return thisGroup.toResponseObject();
    }

    async groupRemoveTeacher(payload: GroupRemoveTeacherDto) {
        const {groupId, teacherId} = payload;
        const thisGroup = await this.groupRepository.findOne({where: {groupId: groupId}, relations: ['teacher']});
        if (!thisGroup) throw new HttpException(
            `Group ${groupId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );
        const teacher = await this.staffRepository.findOne({where: {staffId: teacherId}});
        if (!teacher) throw new HttpException(
            `Teacher with ID ${teacherId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );
        thisGroup.teacher = null;
        await this.groupRepository.save(thisGroup)
        return {removedTeacher: teacherId};
    }
}