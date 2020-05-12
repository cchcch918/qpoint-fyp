import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ClassEntity} from "./class.entity";

@Injectable()
export class ClassService {
    constructor(
        @InjectRepository(ClassEntity) private classRepository: Repository<ClassEntity>) {

    }
}