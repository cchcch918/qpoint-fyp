import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TestModule} from './test/test.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {APP_FILTER} from "@nestjs/core";
import {HttpErrorFilter} from "./utils/http-error.filter";
import {StaffModule} from "./staff/staff.module";
import {StudentModule} from "./student/student.module";
import {ParentModule} from "./parent/parent.module";
import {ClassModule} from "./class/class.module";
import {GroupModule} from "./group/group.module";
import {BadgeModule} from "./badge/badge.module";
import {BehaviourModule} from "./behaviour/behaviour.module";
import {NotificationModule} from "./notification/notification.module";
import {StudentBehaviourRecordModule} from "./student-behaviour-record/student-behaviour-record.module";


@Module({
    imports: [
        TypeOrmModule.forRoot(),
        TestModule,
        StaffModule,
        StudentModule,
        ParentModule,
        ClassModule,
        GroupModule,
        BadgeModule,
        BehaviourModule,
        NotificationModule,
        StudentBehaviourRecordModule,
    ],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_FILTER,
        useClass: HttpErrorFilter
    }],
})
export class AppModule {
}
