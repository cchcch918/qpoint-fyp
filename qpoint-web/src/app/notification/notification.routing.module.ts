import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/service/auth-guard.service";
import {NgModule} from "@angular/core";
import {ManageNotificationPageComponent} from "./component/manage-notification-page/manage-notification-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manage-notification',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-notification',
    component: ManageNotificationPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'manage-notification'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule {
}
