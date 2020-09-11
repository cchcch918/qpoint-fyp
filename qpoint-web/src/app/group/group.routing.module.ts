import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/service/auth-guard.service";
import {NgModule} from "@angular/core";

import {ManageGroupPageComponent} from "./component/manage-group-page/manage-group-page.component";
import {GroupDashboardPageComponent} from "./component/group-dashboard-page/group-dashboard-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manage-group',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-group',
    component: ManageGroupPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'group-dashboard',
    component: GroupDashboardPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'manage-group'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule {
}
