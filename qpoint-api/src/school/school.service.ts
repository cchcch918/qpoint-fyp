import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SchoolEntity} from "./school.entity";

@Injectable()
export class SchoolService {
    constructor(
        @InjectRepository(SchoolEntity) private schoolRepository: Repository<SchoolEntity>) {
    }
}