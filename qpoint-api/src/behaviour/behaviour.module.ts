import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BehaviourController} from "./behaviour.controller";
import {BehaviourService} from "./behaviour.service";
import {BehaviourEntity} from "./behaviour.entity";
import {StaffEntity} from "../staff/staff.entity";


@Module({
    imports: [TypeOrmModule.forFeature([BehaviourEntity, StaffEntity])],
    controllers: [BehaviourController],
    providers: [BehaviourService],
})
export class BehaviourModule {
}