import {IsDate, IsNumber, IsString} from 'class-validator';

export class TestDto {

    @IsNumber()
    readonly id: number;

    @IsString()
    readonly fullName: string;


    @IsDate()
    readonly birthday: Date;

    @IsString()
    readonly isActive: string;
}

export class CreateTestDto {

    @IsString()
    readonly fullName: string;

    @IsString()
    readonly birthday: Date;

    @IsString()
    readonly isActive: string;
}

export class DeleteTestDto {

    @IsNumber()
    readonly id: number;

}


