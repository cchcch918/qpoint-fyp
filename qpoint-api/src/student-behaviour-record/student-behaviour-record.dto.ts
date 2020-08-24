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

export class GetStudentBehaviourRecordsDto {
    @IsNotEmpty()
    studentId: number;
}

export class GetStudentBehaviourRecordsbyStaffDto {
    @IsNotEmpty()
    staffId:number
}

export class UpdateStudentBehaviouralRecordsDto {
    @IsNotEmpty()
    recordId: number;

    @IsNotEmpty()
    behaviourId: number;
}

export class DeleteStudentBehaviourRecordsDto {
    @IsArray()
    @ArrayNotEmpty()
    recordList: number[];
}

export class GetStudentBehaviourRecordsByClassDto {
    @IsNotEmpty()
    classId: number;
}

export class GetStudentRankingByClassDto {
    @IsNotEmpty()
    classId: number;

    @IsNotEmpty()
    rankingNumber: number;
}