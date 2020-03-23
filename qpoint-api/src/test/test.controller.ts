import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {TestService} from "./test.service";
import {Test} from "./test.entity";

@Controller('test')
export class TestController {

    constructor(private service: TestService) {
    }

    @Get(':id')
    get(@Param() params) {
        return this.service.getUser(params.id);
    }

    @Post()
    create(@Body() user: Test) {
        return this.service.createUser(user);
    }

    @Put()
    update(@Body() user: Test) {
        return this.service.updateUser(user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }

}
