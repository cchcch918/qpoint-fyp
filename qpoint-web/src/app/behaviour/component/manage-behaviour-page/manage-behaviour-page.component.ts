import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../core/service/login.service";

@Component({
  selector: 'app-manage-behaviour-page',
  templateUrl: './manage-behaviour-page.component.html',
  styleUrls: ['./manage-behaviour-page.component.css']
})
export class ManageBehaviourPageComponent implements OnInit {
  adminId: number;
  update: boolean = false;

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
