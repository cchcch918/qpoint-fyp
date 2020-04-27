import {Body, Controller, Get, Param, Post, UseGuards, UsePipes} from "@nestjs/common";
import {ValidationPipe} from "../utils/validation.pipe";
import {StaffService} from "./staff.service";
import {StaffLoginDto, StaffRegisterDto} from "./staff.dto";
import {AuthGuard} from "../utils/auth.guard";

@Controller('staff')
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

    @Get('auth/get-account-details-by-username/:username')
    getAccountDetailsByUsername(@Param() params) {
        return this.staffService.getAccountDetailsByUsername(params.username);
    }

    @Post('auth/login')
    @UsePipes(new ValidationPipe())
    login(@Body() data: StaffLoginDto) {
        return this.staffService.login(data);
    }

    @Post('auth/register')
    @UsePipes(new ValidationPipe())
    register(@Body() data: StaffRegisterDto) {
        return this.staffService.register(data);
    }

    @Post('auth/change-password')
    @UsePipes(new ValidationPipe())
    changePassword(@Body() payload: any) {
        return this.staffService.changePassword(payload);
    }

    @Get('api/check-staff-exists/:username')
    checkStaffExists(@Param() params) {
        return this.staffService.checkStaffExists(params.username);
    }

    @Post('auth/admin/send-forget-password-email')
    @UsePipes(new ValidationPipe())
    sendForgetPasswordEmail(@Body() payload: any) {
        return this.staffService.sendForgetPasswordEmail(payload);
    }

    @Post('auth/admin/verify-password-reset-token')
    @UsePipes(new ValidationPipe())
    verifyPasswordResetToken(@Body() payload: any) {
        return this.staffService.verifyPasswordResetToken(payload);
    }

}