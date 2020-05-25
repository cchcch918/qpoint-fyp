import {Body, Controller, Post, UsePipes} from "@nestjs/common";
import {StudentBehaviourRecordService} from "./student-behaviour-record.service";
import {ValidationPipe} from "../utils/validation.pipe";
import {AddBehavioursToStudentsDto, GetStudentPointDto} from "./student-behaviour-record.dto";

@Controller('student-behaviour-record')
export class StudentBehaviourRecordController {
    constructor(private studentBehaviourRecordService: StudentBehaviourRecordService) {
    }

    @Post('add-behaviours-to-students')
    @UsePipes(new ValidationPipe())
    addBehavioursToStudents(@Body() payload: AddBehavioursToStudentsDto) {
        return this.studentBehaviourRecordService.addBehavioursToStudents(payload);
    }

    @Post('get-students-point')
    @UsePipes(new ValidationPipe())
    getStudentPoint(@Body() payload: GetStudentPointDto) {
        return this.studentBehaviourRecordService.getStudentPoint(payload);
    }
}