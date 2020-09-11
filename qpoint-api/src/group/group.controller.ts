import {Body, Controller, Post, UsePipes} from "@nestjs/common";
import {GroupService} from "./group.service";
import {ValidationPipe} from "../utils/validation.pipe";
import {
    CreateGroupDto,
    DeleteGroupDto,
    GroupRemoveStudentsDto,
    GroupRemoveTeacherDto,
    GroupUpdateStudentsDto,
    GroupUpdateTeacherDto
} from "./group.dto";


@Controller('group')
export class GroupController {
    constructor(private groupService: GroupService) {
    }

    @Post('show-all-groups')
    @UsePipes(new ValidationPipe())
    showAllClasses() {
        return this.groupService.showAllGroups();
    }

    @Post('create-new-group')
    @UsePipes(new ValidationPipe())
    createNewClass(@Body() newGroup: CreateGroupDto) {
        return this.groupService.createNewGroup(newGroup);
    }

    @Post('delete-group')
    @UsePipes(new ValidationPipe())
    deleteClass(@Body() deleteGroup: DeleteGroupDto) {
        return this.groupService.deleteGroup(deleteGroup);
    }

    @Post('update-students')
    @UsePipes(new ValidationPipe())
    updateStudents(@Body() payload: GroupUpdateStudentsDto) {
        return this.groupService.groupUpdateStudents(payload);
    }

    @Post('remove-students')
    @UsePipes(new ValidationPipe())
    removeStudents(@Body() payload: GroupRemoveStudentsDto) {
        return this.groupService.groupRemoveStudents(payload);
    }

    @Post('update-teacher')
    @UsePipes(new ValidationPipe())
    updateTeachers(@Body() payload: GroupUpdateTeacherDto) {
        return this.groupService.groupUpdateTeacher(payload);
    }

    @Post('remove-teacher')
    @UsePipes(new ValidationPipe())
    removeTeachers(@Body() payload: GroupRemoveTeacherDto) {
        return this.groupService.groupRemoveTeacher(payload);
    }

}