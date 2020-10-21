import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-create-notification-form',
  templateUrl: './create-notification-form.component.html',
  styleUrls: ['./create-notification-form.component.css']
})
export class CreateNotificationFormComponent implements OnInit {

  @Input() adminId: number;

  createNotificationForm: FormGroup;
  createNotificationLoading: boolean;


  constructor(private fb: FormBuilder, private notificationService: NotificationService, private msg: NzMessageService,) {
  }

  ngOnInit(): void {
    this.createNotificationForm = this.fb.group({
      notificationTitle: [null, [Validators.required]],
      notificationMessage: [null, [Validators.required]],
    });
  }

  submitForm() {
    this.createNotificationLoading = true;
    let payload = {
      notificationTitle: this.createNotificationForm.controls['notificationTitle'].value,
      notificationMessage: this.createNotificationForm.controls['notificationMessage'].value,
      createdByAdminId: this.adminId
    }
    this.notificationService.createNotification(payload).subscribe(res => {
        if (res) {
          this.createNotificationLoading = false;
          this.msg.success(`Notification ${payload.notificationTitle} created`);
          this.createNotificationForm.reset();
          this.notificationService.sendCreateNotificationEvent();

        }
      },
      error => {
        this.createNotificationLoading = false;
        this.msg.error('Please try again later' + error.errorMessage);
      })
  }
}
