import {Body, Controller, Post, UsePipes} from "@nestjs/common";
import {ClassService} from "./class.service";
import {ValidationPipe} from "../utils/validation.pipe";
import {
    CreateClassDto,
    DeleteClassDto,
    RemoveStudentsDto,
    RemoveTeachersDto,
    UpdateStudentsDto,
    UpdateTeachersDto
} from "./class.dto";

@Controller('class')
export class ClassController {
    constructor(private classService: ClassService) {
    }

    @Post('show-all-classes')
    @UsePipes(new ValidationPipe())
    showAllClasses() {
        return this.classService.showAllClasses();
    }

    @Post('show-only-all-classes')
    @UsePipes(new ValidationPipe())
    showOnlyAllClasses() {
        return this.classService.showOnlyAllClasses();
    }

    @Post('create-new-class')
    @UsePipes(new ValidationPipe())
    createNewClass(@Body() newClass: CreateClassDto) {
        return this.classService.createNewClass(newClass);
    }

    @Post('delete-class')
    @UsePipes(new ValidationPipe())
    deleteClass(@Body() deleteClass: DeleteClassDto) {
        return this.classService.deleteClass(deleteClass);
    }

    @Post('update-students')
    @UsePipes(new ValidationPipe())
    updateStudents(@Body() payload: UpdateStudentsDto) {
        return this.classService.classUpdateStudents(payload);
    }

    @Post('remove-students')
    @UsePipes(new ValidationPipe())
    removeStudents(@Body() payload: RemoveStudentsDto) {
        return this.classService.classRemoveStudents(payload);
    }

    @Post('update-teachers')
    @UsePipes(new ValidationPipe())
    updateTeachers(@Body() payload: UpdateTeachersDto) {
        return this.classService.classUpdateTeachers(payload);
    }

    @Post('remove-teachers')
    @UsePipes(new ValidationPipe())
    removeTeachers(@Body() payload: RemoveTeachersDto) {
        return this.classService.classRemoveTeachers(payload);
    }

}