import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ParentEntity} from "./parent.entity";
import {ParentController} from "./parent.controller";
import {ParentService} from "./parent.service";


@Module({
    imports: [TypeOrmModule.forFeature([ParentEntity])],
    controllers: [ParentController],
    providers: [ParentService],
})
export class ParentModule {
}