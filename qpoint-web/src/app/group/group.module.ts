import {NgModule} from "@angular/core";
import {CoreModule} from "../core/core.module";
import {GroupRoutingModule} from "./group.routing.module";
import {GroupService} from "./service/group.service";
import {CreateGroupFormComponent} from './component/create-group-form/create-group-form.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {ManageGroupPageComponent} from './component/manage-group-page/manage-group-page.component';
import {GroupListTableComponent} from './component/group-list-table/group-list-table.component';
import {StudentService} from "../student/service/student.service";
import {StaffService} from "../staff/service/staff.service";
import {GroupDashboardPageComponent} from './component/group-dashboard-page/group-dashboard-page.component';
import {GroupLeaderboardComponent} from './component/group-leaderboard/group-leaderboard.component';
import {GroupLatestRecordComponent} from './component/group-latest-record/group-latest-record.component';
import {GroupHeatMapComponent} from './component/group-heat-map/group-heat-map.component';

@NgModule({
  declarations: [CreateGroupFormComponent, ManageGroupPageComponent, GroupListTableComponent, GroupDashboardPageComponent, GroupLeaderboardComponent, GroupLatestRecordComponent, GroupHeatMapComponent],
  imports: [
    CoreModule,
    GroupRoutingModule,
    NgxChartsModule,
  ],
  providers: [
    GroupService,
    StudentService,
    StaffService,
  ],

})
export class GroupModule {

}
