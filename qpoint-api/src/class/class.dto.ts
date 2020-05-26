import {ArrayNotEmpty, IsArray, IsNotEmpty} from "class-validator";

export class ClassDto {

}

export class CreateClassDto {
    @IsNotEmpty()
    className: string;

    @IsNotEmpty()
    createdByAdminId: string;
}

export class DeleteClassDto {
    @IsNotEmpty()
    classId: number;

}

export class UpdateStudentsDto {
    @IsNotEmpty()
    classId: number;

    @IsArray()
    studentIdList: number[];
}

export class RemoveStudentsDto {
    @IsNotEmpty()
    classId: number;

    @ArrayNotEmpty()
    @IsArray()
    studentIdList: number[];
}

export class UpdateTeachersDto {
    @IsNotEmpty()
    classId: number;

    @IsArray()
    teacherIdList: number[];
}

export class RemoveTeachersDto {
    @IsNotEmpty()
    classId: number;

    @ArrayNotEmpty()
    @IsArray()
    teacherIdList: number[];
}