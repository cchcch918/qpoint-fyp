import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BadgeEntity} from "./badge.entity";
import {BadgeController} from "./badge.controller";
import {BadgeService} from "./badge.service";


@Module({
    imports: [TypeOrmModule.forFeature([BadgeEntity])],
    controllers: [BadgeController],
    providers: [BadgeService],
})
export class BadgeModule {
}