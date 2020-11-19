import {Body, Controller, Post, UsePipes} from "@nestjs/common";
import {StudentBehaviourRecordService} from "./student-behaviour-record.service";
import {ValidationPipe} from "../utils/validation.pipe";
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

    @Post('get-student-behaviour-records-by-staff')
    @UsePipes(new ValidationPipe())
    getStudentBehaviouralRecordsByStaff(@Body() payload: GetStudentBehaviourRecordsbyStaffDto) {
        return this.studentBehaviourRecordService.getStudentBehaviouralRecordsByStaff(payload);
    }

    @Post('update-student-behaviour-records')
    @UsePipes(new ValidationPipe())
    updateStudentBehaviouralRecords(@Body() payload: UpdateStudentBehaviouralRecordsDto) {
        return this.studentBehaviourRecordService.updateStudentBehaviouralRecords(payload)
    }

    @Post('delete-student-behaviour-records')
    @UsePipes(new ValidationPipe())
    deleteStudentBehaviourRecords(@Body() payload: DeleteStudentBehaviourRecordsDto) {
        return this.studentBehaviourRecordService.deleteStudentBehaviourRecords(payload)
    }

    @Post('get-today-record-details')
    @UsePipes(new ValidationPipe())
    getTodayRecordDetails() {
        return this.studentBehaviourRecordService.getTodayRecordDetails();
    }

    @Post('get-overall-student-behaviour-records')
    @UsePipes(new ValidationPipe())
    getOverallStudentBehaviourRecords() {
        return this.studentBehaviourRecordService.getOverallStudentBehaviourRecords();
    }

    @Post('get-overall-ranking')
    @UsePipes(new ValidationPipe())
    getOverallRanking() {
        return this.studentBehaviourRecordService.getOverallRanking();
    }

    @Post('get-student-behaviour-records-by-class')
    @UsePipes(new ValidationPipe())
    getStudentBehaviouralRecordsByClass(@Body() payload: GetStudentBehaviourRecordsByClassDto) {
        return this.studentBehaviourRecordService.getStudentBehaviouralRecordsByClass(payload);
    }

    @Post('get-student-behaviour-records-by-group')
    @UsePipes(new ValidationPipe())
    getStudentBehaviouralRecordsByGroup(@Body() payload: GetStudentBehaviourRecordsByGroupDto) {
        return this.studentBehaviourRecordService.getStudentBehaviouralRecordsByGroup(payload);
    }

    @Post('get-student-ranking-by-class')
    @UsePipes(new ValidationPipe())
    getStudentRankingByClass(@Body() payload: GetStudentRankingByClassDto) {
        return this.studentBehaviourRecordService.getStudentRankingByClass(payload);
    }

    @Post('get-student-ranking-by-group')
    @UsePipes(new ValidationPipe())
    getStudentRankingByGroup(@Body() payload: GetStudentRankingByGroupDto) {
        return this.studentBehaviourRecordService.getStudentRankingByGroup(payload);
    }
}