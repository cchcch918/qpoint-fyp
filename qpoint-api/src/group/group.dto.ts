import {ArrayNotEmpty, IsArray, IsNotEmpty} from "class-validator";

export class GroupDto {
}

export class CreateGroupDto {
    @IsNotEmpty()
    groupName: string;

    @IsNotEmpty()
    createdByAdminId: string;
}

export class DeleteGroupDto {
    @IsNotEmpty()
    groupId: number;
}

export class GroupUpdateStudentsDto {
    @IsNotEmpty()
    groupId: number;

    @IsArray()
    studentIdList: number[];
}

export class GroupRemoveStudentsDto {
    @IsNotEmpty()
    groupId: number;

    @ArrayNotEmpty()
    @IsArray()
    studentIdList: number[];
}

export class GroupUpdateTeacherDto {
    @IsNotEmpty()
    groupId: number;

    teacherId: number;
}

export class GroupRemoveTeacherDto {
    @IsNotEmpty()
    groupId: number;

    @IsNotEmpty()
    teacherId: number;
}
