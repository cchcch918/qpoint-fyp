import {IsNotEmpty} from "class-validator";

export class CreateStudentDto {
    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    parentEmail: string;
}

export class ParentLoginDto {
    @IsNotEmpty()
    parentEmail: string;

    @IsNotEmpty()
    password: string;
}