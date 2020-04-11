import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TestModule} from './test/test.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {APP_FILTER} from "@nestjs/core";
import {HttpErrorFilter} from "./shared/http-error.filter";
import {StaffModule} from "./staff/staff.module";


@Module({
    imports: [
        TypeOrmModule.forRoot(),
        TestModule,
        StaffModule
    ],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_FILTER,
        useClass: HttpErrorFilter
    }],
})
export class AppModule {
}
