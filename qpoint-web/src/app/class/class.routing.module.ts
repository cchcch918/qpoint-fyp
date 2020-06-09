import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/service/auth-guard.service";
import {NgModule} from "@angular/core";
import {ManageClassPageComponent} from "./component/manage-class-page/manage-class-page.component";
import {ClassDashboardPageComponent} from "./component/class-dashboard-page/class-dashboard-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'class-dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-class',
    component: ManageClassPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'class-dashboard',
    component: ClassDashboardPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'class-dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule {
}
