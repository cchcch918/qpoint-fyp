import {NgModule} from "@angular/core";
import {CoreModule} from "../core/core.module";
import {StudentRoutingModule} from "./student.routing.module";
import {CreateStudentFormComponent} from './component/create-student-form/create-student-form.component';
import {StudentService} from "./service/student.service";
import {StudentQrcodeListComponent} from './component/student-qrcode-list/student-qrcode-list.component';
import {StudentListTableComponent} from './component/student-list-table/student-list-table.component';
import {ManageStudentPageComponent} from './component/manage-student-page/manage-student-page.component';

@NgModule({
  declarations: [
    CreateStudentFormComponent,
    StudentQrcodeListComponent,
    StudentListTableComponent,
    ManageStudentPageComponent
  ],
  imports: [
    CoreModule,
    StudentRoutingModule,
  ],
  providers: [
    StudentService,
  ],

})
export class StudentModule {

}
