import {IsNotEmpty} from "class-validator";

export class ParentLoginDto {
    @IsNotEmpty()
    parentEmail: string;

    @IsNotEmpty()
    password: string;

    deviceId?: string;

    devicePlatform?: string;
}

export class ParentChangePasswordDto {
    @IsNotEmpty()
    parentEmail: string;

    @IsNotEmpty()
    oldPassword: string;

    @IsNotEmpty()
    newPassword: string;
}
