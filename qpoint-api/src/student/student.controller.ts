import {Body, Controller, Post, UploadedFiles, UseInterceptors, UsePipes} from "@nestjs/common";
import {StudentService} from "./student.service";
import {CreateStudentDto} from "./student.dto";
import {ValidationPipe} from "../utils/validation.pipe";
import {AnyFilesInterceptor} from "@nestjs/platform-express";

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService) {
    }

    @Post('create-new-student')
    @UsePipes(new ValidationPipe())
    createNewStudent(@Body() student: CreateStudentDto) {
        return this.studentService.createNewStudent(student);
    }

    @Post('show-all-students-qrcode')
    showAllStudentsQrCode() {
        return this.studentService.showAllStudentsQrCode();
    }

    @Post('show-all-students')
    showAllStudents() {
        return this.studentService.showAllStudents();
    }

    @Post('create-new-students-from-excel')
    @UseInterceptors(AnyFilesInterceptor())
    createNewStudentsFromExcel(@UploadedFiles() csvFiles) {
        return this.studentService.createNewStudentsFromExcel(csvFiles);
    }
}