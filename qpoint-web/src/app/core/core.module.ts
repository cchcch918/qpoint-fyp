import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SideNavigationBarComponent} from './component/side-navigation-bar/side-navigation-bar.component';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {RouterModule} from "@angular/router";
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {ClipboardModule} from "@angular/cdk/clipboard";
import {SharedBehaviourPieChartComponent} from "./component/shared-behaviour-pie-chart/shared-behaviour-pie-chart.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {SharedBehaviourHeatMapCalendarComponent} from "./component/shared-behaviour-heat-map-calendar/shared-behaviour-heat-map-calendar.component";


let CoreComponent = [
  SideNavigationBarComponent,
  SharedBehaviourPieChartComponent,
  SharedBehaviourHeatMapCalendarComponent,
]

@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule,
    NgxChartsModule,
  ],
  exports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    CoreComponent,
    Ng2SearchPipeModule,
    ClipboardModule,
  ]
})
export class CoreModule {
}
