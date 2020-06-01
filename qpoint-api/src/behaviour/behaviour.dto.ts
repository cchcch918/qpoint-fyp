import {IsNotEmpty, IsNumber} from "class-validator";

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

export class DeleteBehaviourDto {
    @IsNotEmpty()
    behaviourId: number;
}


export class UpdateBehaviourDto {
    @IsNotEmpty()
    behaviourId: number;

    @IsNotEmpty()
    behaviourName: string;

    @IsNumber()
    behaviourPoint: number;
}
