import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ParentEntity} from "./parent.entity";
import {ParentController} from "./parent.controller";
import {ParentService} from "./parent.service";
import {AuthGuard} from "../utils/auth.guard";

@Module({
    imports: [TypeOrmModule.forFeature([ParentEntity])],
    controllers: [ParentController],
    providers: [ParentService, AuthGuard],
})
export class ParentModule {
}