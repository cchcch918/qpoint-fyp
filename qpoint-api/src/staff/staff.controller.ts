import {Body, Controller, Get, Post, UseGuards, UsePipes} from "@nestjs/common";
import {ValidationPipe} from "../shared/validation.pipe";
import {StaffService} from "./staff.service";
import {StaffLoginDto} from "./staff.dto";
import {AuthGuard} from "../shared/auth.guard";

@Controller()
export class StaffController {
    constructor(private staffService: StaffService) {
    }

    @Get('api/staffs')
    @UseGuards(new AuthGuard())
    showAllUsers() {
        return this.staffService.showAll();
    }

    // @Get('api/users/:username')
    // showOneUser(@Param('username') username: string) {
    //     return this.staffService.read(username);
    // }
    //
    // @Get('auth/whoami')
    // showMe(@User('username') username: string) {
    //     return this.staffService.read(username);
    // }

    @Post('auth/login')
    @UsePipes(new ValidationPipe())
    login(@Body() data: StaffLoginDto) {
        return this.staffService.login(data);
    }

    @Post('auth/register')
    @UsePipes(new ValidationPipe())
    register(@Body() data: StaffLoginDto) {
        return this.staffService.register(data);
    }
}