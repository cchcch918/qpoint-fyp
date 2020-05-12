import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BehaviourController} from "./behaviour.controller";
import {BehaviourService} from "./behaviour.service";
import {BehaviourEntity} from "./behaviour.entity";


@Module({
    imports: [TypeOrmModule.forFeature([BehaviourEntity])],
    controllers: [BehaviourController],
    providers: [BehaviourService],
})
export class BehaviourModule {
}