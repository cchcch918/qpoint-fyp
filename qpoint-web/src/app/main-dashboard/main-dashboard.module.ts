import {NgModule} from '@angular/core';
import {CoreModule} from "../core/core.module";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {MainDashboardRoutingModule} from "./main-dashboard.routing.module";
import {MainDashboardService} from "./service/main-dashboard.service";
import {MainDashboardPageComponent} from './component/main-dashboard-page/main-dashboard-page.component';
import {TodayRecordsComponent} from './component/today-records/today-records.component';
import {SharedSmallCardComponent} from './component/shared-small-card/shared-small-card.component';
import {OverallLatestRecordComponent} from './component/overall-latest-record/overall-latest-record.component';
import {LeaderboardComponent} from './component/leaderboard/leaderboard.component';


@NgModule({
  declarations: [MainDashboardPageComponent, TodayRecordsComponent, SharedSmallCardComponent, OverallLatestRecordComponent, LeaderboardComponent],
  imports: [
    CoreModule,
    MainDashboardRoutingModule,
    NgxChartsModule,
  ],
  providers: [
    MainDashboardService,
  ]
})
export class MainDashboardModule {
}
