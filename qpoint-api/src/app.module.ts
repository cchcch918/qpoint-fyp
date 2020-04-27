import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TestModule} from './test/test.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {APP_FILTER} from "@nestjs/core";
import {HttpErrorFilter} from "./utils/http-error.filter";
import {StaffModule} from "./staff/staff.module";
import {UserModule} from "./user/user.module";


@Module({
    imports: [
        TypeOrmModule.forRoot(),
        TestModule,
        StaffModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_FILTER,
        useClass: HttpErrorFilter
    }],
})
export class AppModule {
}
