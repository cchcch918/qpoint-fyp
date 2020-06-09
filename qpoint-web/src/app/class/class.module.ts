import {NgModule} from "@angular/core";
import {CoreModule} from "../core/core.module";
import {ClassService} from "./service/class.service";
import {ClassRoutingModule} from "./class.routing.module";
import {ClassListTableComponent} from './component/class-list-table/class-list-table.component';
import {ManageClassPageComponent} from './component/manage-class-page/manage-class-page.component';
import {CreateClassFormComponent} from './component/create-class-form/create-class-form.component';
import {StudentService} from "../student/service/student.service";
import {StaffService} from "../staff/service/staff.service";
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ClassDashboardPageComponent} from './component/class-dashboard-page/class-dashboard-page.component';
import {ClassHeatMapCalendarComponent} from './component/class-heat-map-calendar/class-heat-map-calendar.component';
import {ClassLeaderboardComponent} from './component/class-leaderboard/class-leaderboard.component';
import {ClassBehaviourPieChartComponent} from './component/class-behaviour-pie-chart/class-behaviour-pie-chart.component';
import {ClassLatestRecordComponent} from './component/class-latest-record/class-latest-record.component';


@NgModule({
  declarations: [
    ClassListTableComponent,
    ManageClassPageComponent,
    CreateClassFormComponent,
    ClassDashboardPageComponent,
    ClassHeatMapCalendarComponent,
    ClassLeaderboardComponent,
    ClassBehaviourPieChartComponent,
    ClassLatestRecordComponent
  ],
  imports: [
    CoreModule,
    ClassRoutingModule,
    NgxChartsModule,
  ],
  providers: [
    ClassService, StudentService, StaffService
  ],

})
export class ClassModule {

}
