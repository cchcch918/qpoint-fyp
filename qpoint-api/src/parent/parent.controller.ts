import {Body, Controller, Post, UsePipes} from "@nestjs/common";
import {ParentService} from "./parent.service";
import {ValidationPipe} from "../utils/validation.pipe";
import {ParentLoginDto} from "./parent.dto";

@Controller('parent')
export class ParentController {
    constructor(private parentService: ParentService) {
    }

    @Post('parent-login')
    @UsePipes(new ValidationPipe())
    parentLogin(@Body() payload: ParentLoginDto) {
        return this.parentService.parentLogin(payload);
    }

    @Post('show-parent-details')
    @UsePipes(new ValidationPipe())
    showParentDetails(@Body() payload: any) {
        return this.parentService.showParentDetails(payload);
    }

}