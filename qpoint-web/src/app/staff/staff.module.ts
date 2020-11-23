import {NgModule} from "@angular/core";
import {CoreModule} from "../core/core.module";
import {StaffService} from "./service/staff.service";
import {StaffRoutingModule} from "./staff.routing.module";
import {ManageStaffPageComponent} from './component/manage-staff-page/manage-staff-page.component';
import {CreateStaffFormComponent} from "./component/create-staff-form/create-staff-form.component";
import {StaffListTableComponent} from './component/staff-list-table/staff-list-table.component';
import {TeachersActivitiesPageComponent} from './component/teachers-activities-page/teachers-activities-page.component';
import {ActivityDetailsModalComponent} from './component/activity-details-modal/activity-details-modal.component';
import {TeacherCardListComponent} from './component/teacher-card-list/teacher-card-list.component';

@NgModule({
  declarations: [
    CreateStaffFormComponent,
    ManageStaffPageComponent,
    StaffListTableComponent,
    TeachersActivitiesPageComponent,
    ActivityDetailsModalComponent,
    TeacherCardListComponent
  ],
  imports: [
    CoreModule,
    StaffRoutingModule,
  ],
  providers: [
    StaffService,
  ],

})
export class StaffModule {

}
