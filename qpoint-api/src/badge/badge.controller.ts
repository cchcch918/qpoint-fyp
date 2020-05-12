import {Controller} from "@nestjs/common";
import {BadgeService} from "./badge.service";

@Controller('badge')
export class BadgeController {
    constructor(private badgeService: BadgeService) {
    }
}