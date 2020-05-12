import {NgModule} from "@angular/core";
import {CoreModule} from "../core/core.module";
import {StudentRoutingModule} from "./student.routing.module";
import {CreateStudentFormComponent} from './component/create-student-form/create-student-form.component';
import {StudentService} from "./service/student.service";
import {StudentQrcodeListComponent} from './component/student-qrcode-list/student-qrcode-list.component';

@NgModule({
  declarations: [
    CreateStudentFormComponent,
    StudentQrcodeListComponent],
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
