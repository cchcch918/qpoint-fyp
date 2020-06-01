import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/service/auth-guard.service";
import {NgModule} from "@angular/core";
import {ManageBehaviourPageComponent} from "./component/manage-behaviour-page/manage-behaviour-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manage-behaviour',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-behaviour',
    component: ManageBehaviourPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'manage-behaviour'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BehaviourRoutingModule {
}
