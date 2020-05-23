import {TypeOrmModule} from "@nestjs/typeorm";
import {StaffService} from "./staff.service";
import {Module} from "@nestjs/common";
import {StaffEntity} from "./staff.entity";
import {StaffController} from "./staff.controller";
import {AuthGuard} from "../utils/auth.guard";

@Module({
    imports: [TypeOrmModule.forFeature([StaffEntity])],
    controllers: [StaffController],
    providers: [StaffService, AuthGuard],
})
export class StaffModule {
}