import {Body, Controller, Post, UsePipes} from "@nestjs/common";
import {ClassService} from "./class.service";
import {ValidationPipe} from "../utils/validation.pipe";
import {
    AddStudentsDto,
    AddTeachersDto,
    CreateClassDto,
    DeleteClassDto,
    RemoveStudentsDto,
    RemoveTeachersDto
} from "./class.dto";

@Controller('class')
export class ClassController {
    constructor(private classService: ClassService) {
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

    @Post('add-students')
    @UsePipes(new ValidationPipe())
    addStudents(@Body() payload: AddStudentsDto) {
        return this.classService.classAddStudents(payload);
    }

    @Post('remove-students')
    @UsePipes(new ValidationPipe())
    removeStudents(@Body() payload: RemoveStudentsDto) {
        return this.classService.classRemoveStudents(payload);
    }

    @Post('add-teachers')
    @UsePipes(new ValidationPipe())
    addTeachers(@Body() payload: AddTeachersDto) {
        return this.classService.classAddTeachers(payload);
    }

    @Post('remove-teachers')
    @UsePipes(new ValidationPipe())
    removeTeachers(@Body() payload: RemoveTeachersDto) {
        return this.classService.classRemoveTeachers(payload);
    }

}