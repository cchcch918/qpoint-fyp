import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {StudentController} from "./student.controller";
import {StudentService} from "./student.service";
import {StudentEntity} from "./student.entity";
import {ParentEntity} from "../parent/parent.entity";
import {MulterModule} from "@nestjs/platform-express";


@Module({
    imports: [
        TypeOrmModule.forFeature([StudentEntity, ParentEntity]),
        MulterModule.register()],
    controllers: [StudentController],
    providers: [StudentService],
})
export class StudentModule {
}