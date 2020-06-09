import {Body, Controller, Post, UsePipes} from "@nestjs/common";
import {StudentBehaviourRecordService} from "./student-behaviour-record.service";
import {ValidationPipe} from "../utils/validation.pipe";
import {
    AddBehavioursToStudentsDto,
    GetStudentBehaviourRecordsByClassDto,
    GetStudentBehaviourRecordsDto,
    GetStudentPointDto,
    GetStudentRankingByClassDto
} from "./student-behaviour-record.dto";

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
    getStudentsPoint(@Body() payload: GetStudentPointDto) {
        return this.studentBehaviourRecordService.getStudentsPoint(payload);
    }

    @Post('get-student-behaviour-records')
    @UsePipes(new ValidationPipe())
    getStudentBehaviouralRecords(@Body() payload: GetStudentBehaviourRecordsDto) {
        return this.studentBehaviourRecordService.getStudentBehaviouralRecords(payload);
    }

    @Post('get-student-behaviour-records-by-class')
    @UsePipes(new ValidationPipe())
    getStudentBehaviouralRecordsByClass(@Body() payload: GetStudentBehaviourRecordsByClassDto) {
        return this.studentBehaviourRecordService.getStudentBehaviouralRecordsByClass(payload);
    }

    @Post('get-student-ranking-by-class')
    @UsePipes(new ValidationPipe())
    getStudentRankingByClass(@Body() payload: GetStudentRankingByClassDto) {
        return this.studentBehaviourRecordService.getStudentRankingByClass(payload);
    }
}