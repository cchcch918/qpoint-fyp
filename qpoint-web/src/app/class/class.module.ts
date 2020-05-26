import {NgModule} from "@angular/core";
import {CoreModule} from "../core/core.module";
import {ClassService} from "./service/class.service";
import {ClassRoutingModule} from "./class.routing.module";
import {ClassListTableComponent} from './component/class-list-table/class-list-table.component';
import {ManageClassPageComponent} from './component/manage-class-page/manage-class-page.component';
import {CreateClassFormComponent} from './component/create-class-form/create-class-form.component';
import {StudentService} from "../student/service/student.service";
import {StaffService} from "../staff/service/staff.service";

@NgModule({
  declarations: [
    ClassListTableComponent,
    ManageClassPageComponent,
    CreateClassFormComponent
  ],
  imports: [
    CoreModule,
    ClassRoutingModule,
  ],
  providers: [
    ClassService, StudentService, StaffService
  ],

})
export class ClassModule {

}
