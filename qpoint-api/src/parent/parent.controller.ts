import {Body, Controller, Post, UsePipes} from "@nestjs/common";
import {ParentService} from "./parent.service";
import {ValidationPipe} from "../utils/validation.pipe";
import {ParentChangePasswordDto, ParentLoginDto} from "./parent.dto";

@Controller('parent')
export class ParentController {
    constructor(private parentService: ParentService) {
    }

    @Post('get-parent-account-details')
    getAdminAccountDetails(@Body() payload: any) {
        return this.parentService.getParentAccountDetails(payload);
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

    @Post('change-parent-password')
    @UsePipes(new ValidationPipe())
    changeParentPassword(@Body() payload: ParentChangePasswordDto) {
        return this.parentService.changeParentPassword(payload);
    }

}