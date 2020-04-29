import {IsNotEmpty} from "class-validator";

export class ParentLoginDto {
    @IsNotEmpty()
    parentEmail: string;

    @IsNotEmpty()
    password: string;
}
