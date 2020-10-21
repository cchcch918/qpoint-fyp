import {Component, OnInit} from '@angular/core';
import {NotificationVoModel} from "../../model/notification-vo-model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-edit-notification-modal',
  templateUrl: './edit-notification-modal.component.html',
  styleUrls: ['./edit-notification-modal.component.css']
})
export class EditNotificationModalComponent implements OnInit {

  selectedNotification: NotificationVoModel;
  showEditModal: boolean = false;
  editNotificationForm: FormGroup;
  editNotificationLoading: boolean;

  constructor(private fb: FormBuilder, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.editNotificationForm = this.fb.group({
      notificationTitle: [{value: ''}, [Validators.required]],
      notificationMessage: [{value: ''}, [Validators.required]],
    });
    this.notificationService.getOpenEditNotificationModalEvent().subscribe(res => {
      if (res) {
        this.selectedNotification = res;
        this.showEditModal = true;
        this.editNotificationForm.patchValue({
          notificationTitle: this.selectedNotification.notificationTitle,
          notificationMessage: this.selectedNotification.notificationMessage
        });
      }
    })
  }

  cancelEditAction() {
    this.showEditModal = false;
    this.editNotificationForm.reset();
    this.selectedNotification = null;
  }

  updateNotification() {
    this.showEditModal = false;
    this.selectedNotification = null;
  }


}
