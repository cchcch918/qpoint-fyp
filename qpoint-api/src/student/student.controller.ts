import {Body, Controller, Post, UsePipes} from "@nestjs/common";
import {StudentService} from "./student.service";
import {CreateStudentDto} from "./student.dto";
import {ValidationPipe} from "../utils/validation.pipe";

@Controller('student')
export class StudentController {
    constructor(private userService: StudentService) {
    }

    @Post('create-new-student')
    @UsePipes(new ValidationPipe())
    createNewStudent(@Body() student: CreateStudentDto) {
        return this.userService.createNewStudent(student);
    }

    @Post('show-all-students-qrcode')
    showAllStudentsQrCode() {
        return this.userService.showAllStudentsQrCode();
    }
}