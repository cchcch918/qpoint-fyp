import {Body, Controller, Post, UsePipes} from "@nestjs/common";
import {BehaviourService} from "./behaviour.service";
import {ValidationPipe} from "../utils/validation.pipe";
import {CreateBehaviourDto} from "./behaviour.dto";

@Controller('behaviour')
export class BehaviourController {
    constructor(private behaviourService: BehaviourService) {
    }

    @Post('create-new-behaviour')
    @UsePipes(new ValidationPipe())
    createNewBehaviour(@Body() newBehaviour: CreateBehaviourDto) {
        return this.behaviourService.createNewBehaviour(newBehaviour);
    }

    @Post('show-all-behaviours')
    @UsePipes(new ValidationPipe())
    showAllBehaviours() {
        return this.behaviourService.showAllBehaviours();
    }
}