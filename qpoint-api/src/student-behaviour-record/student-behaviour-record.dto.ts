import {ArrayNotEmpty, IsArray, IsNotEmpty} from "class-validator";

export class StudentBehaviourRecordDto {

}

export class AddBehavioursToStudentsDto {
    @IsArray()
    @ArrayNotEmpty()
    behaviourList: number[];

    @IsArray()
    @ArrayNotEmpty()
    studentList: number[];

    @IsNotEmpty()
    staffId: number;
}

export class GetStudentPointDto {
    @ArrayNotEmpty()
    @IsArray()
    studentList: number[];
}