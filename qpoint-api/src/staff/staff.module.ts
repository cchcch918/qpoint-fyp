import {TypeOrmModule} from "@nestjs/typeorm";
import {StaffService} from "./staff.service";
import {Module} from "@nestjs/common";
import {StaffEntity} from "./staff.entity";
import {StaffController} from "./staff.controller";

@Module({
    imports: [TypeOrmModule.forFeature([StaffEntity])],
    controllers: [StaffController],
    providers: [StaffService],
})
export class StaffModule {
}