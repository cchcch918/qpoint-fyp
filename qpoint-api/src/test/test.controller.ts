import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes} from '@nestjs/common';
import {TestService} from "./test.service";
import {ResponseModel} from "../utils/model/response.model";
import {ValidationPipe} from "../utils/validation.pipe";
import {CreateTestDto, DeleteTestDto, TestDto} from "./test.dto";

@Controller('test')
export class TestController {

    constructor(private service: TestService) {
    }

    // @Get(':id')
    // get(@Param() params) {
    //     let response = <ResponseModel<>>{} ;
    //     return response = {
    //         status: AppConstant.STATUS_SUCCESS,
    //         data: this.service.getUser(params.id)
    //     };
    // }

    @Get(':id')
    get(@Param() params) {
        return this.service.getUser(params.id)
    }

    @Post('create-test')
    @UsePipes(new ValidationPipe())
    create(@Body() test: CreateTestDto) {
        return this.service.createUser(test);
    }

    @Put()
    update(@Body() user: TestDto) {
        return this.service.updateUser(user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }

    @Post('delete-test-with-id')
    @UsePipes(new ValidationPipe())
    deleteUserWithId(@Body() test: DeleteTestDto): Promise<ResponseModel> {
        return this.service.deleteUserWithId(test.id);
    }

}
