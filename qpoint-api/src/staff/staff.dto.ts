import {IsNotEmpty} from 'class-validator';


export class StaffLoginDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}

export class AdminRegisterDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    email: string;
}

export class StaffRegisterDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    email: string;
}

export class DeleteStaffDto {
    @IsNotEmpty()
    staffId: number;

}

export class ShowClassWithStaffIdDto {
    @IsNotEmpty()
    staffId: number
}
