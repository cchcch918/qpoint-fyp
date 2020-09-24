import {ArrayNotEmpty, IsArray, IsNotEmpty} from "class-validator";

export class StudentBehaviourRecordDto {

}

export class AddBehavioursToStudentsDto {
    @IsNotEmpty()
    behaviourId: number;

    @IsNotEmpty()
    studentId: number;

    @IsNotEmpty()
    staffId: number;
    imageUri: string;
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

    behaviourId: number;
    
    imageUri: string;
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

export class GetStudentBehaviourRecordsByGroupDto {
    @IsNotEmpty()
    groupId: number;
}

export class GetStudentRankingByClassDto {
    @IsNotEmpty()
    classId: number;

    @IsNotEmpty()
    rankingNumber: number;
}

export class GetStudentRankingByGroupDto {
    @IsNotEmpty()
    groupId: number;

    @IsNotEmpty()
    rankingNumber: number;
}