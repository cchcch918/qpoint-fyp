import {Component, OnInit} from '@angular/core';
import {NotificationVoModel} from "../../model/notification-vo-model";
import {NotificationService} from "../../service/notification.service";
import {Subscription} from "rxjs";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  notificationLoading: boolean;
  notifications: NotificationVoModel[];
  subscription: Subscription;

  constructor(private notificationService: NotificationService, private msg: NzMessageService) {
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
    this.notificationLoading = true;
    this.notificationService.showAllNotifications().subscribe(res => {
      this.notifications = res
      this.notificationLoading = false;
    });
  }

  deleteNotification(notification: NotificationVoModel) {
    let payload = {notificationsList: [notification.notificationId]};
    this.notificationService.deleteNotifications(payload).subscribe(res => {
        if (res) {
          this.msg.success(`Notification ${notification.notificationTitle} deleted`);
          this.updateNotificationList();
        }
      },
      error => {
        this.msg.error('Please try again later' + error?.errorMessage);
      });
  }

}
