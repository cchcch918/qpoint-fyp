import {Body, Controller, Post, UsePipes} from "@nestjs/common";
import {UserService} from "./user.service";
import {ValidationPipe} from "../utils/validation.pipe";
import {CreateStudentDto, ParentLoginDto} from "./user.dto";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('create-new-student')
    createNewStudent(@Body() student: CreateStudentDto) {
        return this.userService.createNewStudent(student);
    }

    @Post('show-all-students-qrcode')
    showAllStudentsQrCode() {
        return this.userService.showAllStudentsQrCode();
    }

    @Post('parent-login')
    @UsePipes(new ValidationPipe())
    parentLogin(@Body() payoad: ParentLoginDto) {
        return this.userService.parentLogin(payoad);
    }
}