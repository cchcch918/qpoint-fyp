import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {StudentController} from "./student.controller";
import {StudentService} from "./student.service";
import {StudentEntity} from "./student.entity";
import {ParentEntity} from "../parent/parent.entity";


@Module({
    imports: [TypeOrmModule.forFeature([StudentEntity, ParentEntity])],
    controllers: [StudentController],
    providers: [StudentService],
})
export class StudentModule {
}