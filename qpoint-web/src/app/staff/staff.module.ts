import {NgModule} from "@angular/core";
import {CoreModule} from "../core/core.module";
import {StaffService} from "./service/staff.service";
import {StaffRoutingModule} from "./staff.routing.module";
import {ManageStaffPageComponent} from './component/manage-staff-page/manage-staff-page.component';
import {CreateStaffFormComponent} from "./component/create-staff-form/create-staff-form.component";
import {StaffListTableComponent} from './component/staff-list-table/staff-list-table.component';

@NgModule({
  declarations: [
    CreateStaffFormComponent,
    ManageStaffPageComponent,
    StaffListTableComponent
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
