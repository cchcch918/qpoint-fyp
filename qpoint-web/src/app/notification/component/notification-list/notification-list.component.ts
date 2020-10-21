import {Component, OnInit} from '@angular/core';
import {NotificationVoModel} from "../../model/notification-vo-model";
import {NotificationService} from "../../service/notification.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  notificationLoading: boolean;
  notifications: NotificationVoModel[];
  subscription: Subscription;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.updateNotificationList();
    this.subscription = this.notificationService.getCreateNotificationEvent().subscribe(res => {
      if (res) {
        this.updateNotificationList();
      }
    })
  }

  updateNotificationList() {
    this.notificationService.showAllNotifications().subscribe(res => {
      this.notifications = res
      this.notificationLoading = false;
    });
  }

  deleteNotification(notification: NotificationVoModel) {

  }

  editNotification(notification: NotificationVoModel) {
    console.log("editNotification");
    this.notificationService.sendOpenEditNotificationModalEvent(notification);
  }


}
