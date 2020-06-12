import {IsNotEmpty} from "class-validator";


export class CreateStudentDto {
    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    parentEmail: string;
}

export class DeleteStudentDto {
    @IsNotEmpty()
    studentId: number;
}



