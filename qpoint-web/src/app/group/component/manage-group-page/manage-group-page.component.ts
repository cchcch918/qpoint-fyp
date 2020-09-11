import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../core/service/login.service";

@Component({
  selector: 'app-manage-group-page',
  templateUrl: './manage-group-page.component.html',
  styleUrls: ['./manage-group-page.component.css']
})
export class ManageGroupPageComponent implements OnInit {
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
