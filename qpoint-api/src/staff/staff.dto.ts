import {IsNotEmpty} from 'class-validator';


export class StaffLoginDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}
