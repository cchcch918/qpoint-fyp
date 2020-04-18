import {Component, OnInit} from '@angular/core';
import {TestService} from "../../service/test.service";
import {LoginService} from "../../../core/service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  apiText: any;

  constructor(public testService: TestService, public loginService: LoginService, public router: Router) {
  }

  ngOnInit() {
    this.testService.testApi().subscribe(res => {
      if (res) {
        this.apiText = res.text;
      }
    })
  }

  logout() {
    this.loginService.staffLogout();

  }
}
