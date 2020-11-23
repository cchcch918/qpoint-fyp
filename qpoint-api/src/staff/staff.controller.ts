import {Body, Controller, Get, Param, Post, UsePipes} from "@nestjs/common";
import {ValidationPipe} from "../utils/validation.pipe";
import {StaffService} from "./staff.service";
import {
    AdminRegisterDto,
    DateFilterDto,
    DeleteStaffDto,
    ShowClassWithStaffIdDto,
    StaffLoginDto,
    StaffRegisterDto
} from "./staff.dto";


@Controller('staff')
export class StaffController {
    constructor(private staffService: StaffService) {
    }

    @Post('show-all-staffs')
    @UsePipes(new ValidationPipe())
    showAllStaffs() {
        return this.staffService.showAllStaffs();
    }

    @Post('get-staff-details-by-staff-id')
    @UsePipes(new ValidationPipe())
    getStaffDetailsByStaffId(@Body() payload: any) {
        return this.staffService.getStaffDetailsByStaffId(payload);
    }

    @Post('get-admin-account-details')
    getAdminAccountDetails(@Body() payload: any) {
        return this.staffService.getAdminAccountDetails(payload);
    }

    @Get('auth/get-account-details-by-username/:username')
    getAccountDetailsByUsername(@Param() params) {
        return this.staffService.getAccountDetailsByUsername(params.username);
    }

    @Post('auth/login')
    @UsePipes(new ValidationPipe())
    login(@Body() data: StaffLoginDto) {
        return this.staffService.staffLogin(data);
    }


    @Post('staff-register')
    @UsePipes(new ValidationPipe())
    staffRegister(@Body() data: StaffRegisterDto) {
        return this.staffService.staffRegister(data);
    }

    @Post('delete-staff')
    @UsePipes(new ValidationPipe())
    deleteStaff(@Body() deleteStaffDto: DeleteStaffDto) {
        return this.staffService.deleteStaff(deleteStaffDto);
    }

    @Post('admin-login')
    @UsePipes(new ValidationPipe())
    adminLogin(@Body() data: StaffLoginDto) {
        return this.staffService.adminLogin(data);
    }

    @Post('auth/register')
    @UsePipes(new ValidationPipe())
    adminRegister(@Body() data: AdminRegisterDto) {
        return this.staffService.adminRegister(data);
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

    @Post('show-class-with-staffId')
    @UsePipes(new ValidationPipe())
    showClassWithStaffId(@Body() payload: ShowClassWithStaffIdDto) {
        return this.staffService.showClassWithStaffId(payload)
    }

    @Post('get-teachers-activities-list')
    @UsePipes(new ValidationPipe())
    getTeachersActivitiesList(@Body() payload: DateFilterDto) {
        return this.staffService.getTeachersActivitiesList(payload);
    }

}