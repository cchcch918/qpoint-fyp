import {Controller} from "@nestjs/common";
import {ClassService} from "./class.service";

@Controller('class')
export class ClassController {
    constructor(private classService: ClassService) {
    }
}