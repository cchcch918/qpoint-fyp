import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/service/auth-guard.service";
import {NgModule} from "@angular/core";
import {ManageClassPageComponent} from "./component/manage-class-page/manage-class-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/manage-class',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-class',
    component: ManageClassPageComponent,
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
export class ClassRoutingModule {
}
