import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ClassEntity} from "./class.entity";
import {
    CreateClassDto,
    DeleteClassDto,
    RemoveStudentsDto,
    RemoveTeachersDto,
    UpdateStudentsDto,
    UpdateTeachersDto
} from "./class.dto";
import {StudentEntity} from "../student/student.entity";
import {StaffEntity} from "../staff/staff.entity";


@Injectable()
export class ClassService {
    constructor(
        @InjectRepository(ClassEntity) private classRepository: Repository<ClassEntity>,
        @InjectRepository(StaffEntity) private staffRepository: Repository<StaffEntity>,
        @InjectRepository(StudentEntity) private studentRepository: Repository<StudentEntity>,
    ) {
    }

    async showAllClasses() {
        const classes = await this.classRepository.find({relations: ['students', 'teachers']});
        return classes;
    }

    async showOnlyAllClasses() {
        const classes = await this.classRepository.find();
        return classes;
    }

    async createNewClass(payload: CreateClassDto) {
        const {className, createdByAdminId} = payload;
        const admin = await this.staffRepository.findOne({where: {staffId: createdByAdminId}});
        if (!admin) {
            throw new HttpException(
                'Admin does not exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        const newClass = await this.classRepository.create({"className": className});
        newClass.createdByAdmin = admin;
        await this.classRepository.save(newClass);
        return newClass.toResponseObject();
    }

    async deleteClass(payload: DeleteClassDto) {
        const {classId} = payload;
        const thisClass = await this.classRepository.findOne({where: {classId: classId}, relations: ['students']});
        if (!thisClass) throw new HttpException(
            `Class ${classId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );
        if (thisClass.students) {
            const students: StudentEntity[] = thisClass.students;
            for (const student of students) {
                await this.studentRepository.update(student.studentId, {class: null});
            }
        }
        await this.classRepository.delete({classId: classId});
        return {deletedClass: classId};
    }

    async classUpdateStudents(payload: UpdateStudentsDto) {
        const {classId, studentIdList} = payload;
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

        const thisClass = await this.classRepository.findOne({where: {classId: classId}, relations: ['students']});
        if (!thisClass) throw new HttpException(
            `Class ${classId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );
        thisClass.students = students;
        await this.classRepository.save(thisClass)
        return thisClass.toResponseObject();
    }

    async classRemoveStudents(payload: RemoveStudentsDto) {
        const {classId, studentIdList} = payload;
        const thisClass = await this.classRepository.findOne({where: {classId: classId}, relations: ['students']});
        if (!thisClass) throw new HttpException(
            `Class ${classId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );
        for (const studentId of studentIdList) {
            if (!thisClass.students.some(student => {
                return +student.studentId === +studentId;
            })) {
                throw new HttpException(
                    `Student ${studentId} does not exists`,
                    HttpStatus.BAD_REQUEST,
                );
            }
            thisClass.students = thisClass.students.filter(student => {
                return student.studentId != studentId;
            })
        }
        await this.classRepository.save(thisClass)
        return {removedStudents: studentIdList};
    }

    async classUpdateTeachers(payload: UpdateTeachersDto) {
        const {classId, teacherIdList} = payload;
        const teachers: StaffEntity[] = [];
        for (const teacherId of teacherIdList) {
            teachers.push(await (this.staffRepository.findOne({where: {staffId: teacherId}})).then(res => {
                if (!res) throw new HttpException(
                    `Teacher with ID ${teacherId} does not exists`,
                    HttpStatus.BAD_REQUEST,
                );
                return res;
            }));
        }
        const thisClass = await this.classRepository.findOne({where: {classId: classId}, relations: ['teachers']});
        if (!thisClass) throw new HttpException(
            `Class ${classId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );
        thisClass.teachers = teachers;
        await this.classRepository.save(thisClass)
        return thisClass.toResponseObject();
    }

    async classRemoveTeachers(payload: RemoveTeachersDto) {
        const {classId, teacherIdList} = payload;
        const thisClass = await this.classRepository.findOne({where: {classId: classId}, relations: ['teachers']});
        if (!thisClass) throw new HttpException(
            `Class ${classId} does not exists`,
            HttpStatus.BAD_REQUEST,
        );
        for (const teacherId of teacherIdList) {
            if (!thisClass.teachers.some(teacher => {
                return +teacher.staffId === +teacherId;
            })) {
                throw new HttpException(
                    `Teacher ${teacherId} does not exists`,
                    HttpStatus.BAD_REQUEST,
                );
            }
            thisClass.teachers = thisClass.teachers.filter(teacher => {
                return teacher.staffId != teacherId;
            })
        }
        await this.classRepository.save(thisClass)
        return {removedTeachers: teacherIdList};
    }

}