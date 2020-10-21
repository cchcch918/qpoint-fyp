import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../core/service/login.service";

@Component({
  selector: 'app-manage-notification-page',
  templateUrl: './manage-notification-page.component.html',
  styleUrls: ['./manage-notification-page.component.css']
})
export class ManageNotificationPageComponent implements OnInit {

  adminId: number;

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    let token = `Bearer ${this.loginService.token}`;
    this.loginService.getAdminAccountDetails({token: token}).subscribe(res => {
      if (res) {
        this.adminId = res.staffId;
      }
    })
  }

}
