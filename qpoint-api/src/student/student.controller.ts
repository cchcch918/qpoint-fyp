import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
    UsePipes
} from "@nestjs/common";
import {StudentService} from "./student.service";
import {CreateStudentDto, DeleteStudentDto, ShowStudentWithIdDto} from "./student.dto";
import {editFileName, imageFileFilter, ValidationPipe} from "../utils/validation.pipe";
import {AnyFilesInterceptor, FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from 'multer';


@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService) {
    }

    @Post('create-new-student')
    @UsePipes(new ValidationPipe())
    createNewStudent(@Body() student: CreateStudentDto) {
        return this.studentService.createNewStudent(student);
    }

    @Post('delete-student')
    @UsePipes(new ValidationPipe())
    deleteStudent(@Body() student: DeleteStudentDto) {
        return this.studentService.deleteStudent(student);
    }

    @Post('show-students-with-id')
    @UsePipes(new ValidationPipe())
    showStudentsWithId(@Body() student:ShowStudentWithIdDto) {
        return this.studentService.showStudentsWithId(student);
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

    @Post('upload-student-profile-image')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './assets/student-profile',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    uploadStudentProfileImage(@UploadedFile() image) {
        return this.studentService.uploadStudentProfileImage(image);
    }

    @Get('get-student-profile-image/:imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, {root: './assets/student-profile'});
    }

}

