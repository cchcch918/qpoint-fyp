import {NgModule} from "@angular/core";
import {CoreModule} from "../core/core.module";
import {StudentRoutingModule} from "./student.routing.module";
import {CreateStudentFormComponent} from './component/create-student-form/create-student-form.component';
import {StudentService} from "./service/student.service";
import {StudentQrcodeListComponent} from './component/student-qrcode-list/student-qrcode-list.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {ClipboardModule} from "@angular/cdk/clipboard";

@NgModule({
  declarations: [
    CreateStudentFormComponent,
    StudentQrcodeListComponent],
  imports: [
    CoreModule,
    StudentRoutingModule,
    Ng2SearchPipeModule,
    ClipboardModule,
  ],
  providers: [
    StudentService,
  ],

})
export class StudentModule {

}
