import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/service/auth-guard.service";
import {NgModule} from "@angular/core";
import {MainDashboardPageComponent} from "./component/main-dashboard-page/main-dashboard-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'main-dashboard',
    component: MainDashboardPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'main-dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainDashboardRoutingModule {
}
