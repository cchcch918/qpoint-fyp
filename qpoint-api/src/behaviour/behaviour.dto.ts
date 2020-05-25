import {IsNotEmpty} from "class-validator";

export class BehaviourDto {
}

export class CreateBehaviourDto {
    @IsNotEmpty()
    behaviourName: string;

    @IsNotEmpty()
    createdByAdminId: string;

    @IsNotEmpty()
    behaviourPoint: number;
}