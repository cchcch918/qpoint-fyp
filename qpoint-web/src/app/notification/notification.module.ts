import {NgModule} from '@angular/core';
import {CoreModule} from "../core/core.module";
import {NotificationRoutingModule} from "./notification.routing.module";
import {NotificationService} from "./service/notification.service";
import {ManageNotificationPageComponent} from './component/manage-notification-page/manage-notification-page.component';
import {CreateNotificationFormComponent} from './component/create-notification-form/create-notification-form.component';
import {NotificationListComponent} from './component/notification-list/notification-list.component';
import {EditNotificationModalComponent} from './component/edit-notification-modal/edit-notification-modal.component';


@NgModule({
  declarations: [
    ManageNotificationPageComponent,
    CreateNotificationFormComponent,
    NotificationListComponent,
    EditNotificationModalComponent,
  ],
  imports: [
    CoreModule,
    NotificationRoutingModule,
  ],
  providers: [
    NotificationService
  ]
})
export class NotificationModule {
}
