import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../core/service/login.service";

@Component({
  selector: 'app-manage-staff-page',
  templateUrl: './manage-staff-page.component.html',
  styleUrls: ['./manage-staff-page.component.css']
})
export class ManageStaffPageComponent implements OnInit {
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
