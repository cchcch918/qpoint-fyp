import {Controller} from "@nestjs/common";
import {BehaviourService} from "./behaviour.service";

@Controller('behaviour')
export class BehaviourController {
    constructor(private behaviourService: BehaviourService) {
    }
}