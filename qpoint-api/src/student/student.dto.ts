import {IsNotEmpty} from "class-validator";

export class CreateStudentDto {
    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    parentEmail: string;
}
