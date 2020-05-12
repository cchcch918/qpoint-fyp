import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {GroupService} from "./group.service";
import {GroupController} from "./group.controller";
import {GroupEntity} from "./group.entity";

@Module({
    imports: [TypeOrmModule.forFeature([GroupEntity])],
    controllers: [GroupController],
    providers: [GroupService],
})
export class GroupModule {
}