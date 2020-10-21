import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/service/auth-guard.service";
import {NgModule} from "@angular/core";
import {ManageStaffPageComponent} from "./component/manage-staff-page/manage-staff-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manage-staff',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-staff',
    component: ManageStaffPageComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'group-dashboard',
  //   component: GroupDashboardPageComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: '**',
    redirectTo: 'manage-staff'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule {
}
