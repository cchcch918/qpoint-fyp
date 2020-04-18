import {IsNotEmpty} from 'class-validator';


export class StaffLoginDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}

export class StaffRegisterDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    email: string;
}
