import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthGuard} from "../core/service/auth-guard.service";
import {StudentQrcodeListComponent} from "./component/student-qrcode-list/student-qrcode-list.component";
import {CreateStudentFormComponent} from "./component/create-student-form/create-student-form.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/student-qrcode-list',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'student-qrcode-list',
    component: StudentQrcodeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-student',
    component: CreateStudentFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
