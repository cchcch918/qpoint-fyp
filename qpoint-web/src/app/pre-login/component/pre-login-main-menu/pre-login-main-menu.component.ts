import {Component, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-pre-login-main-menu',
  templateUrl: './pre-login-main-menu.component.html',
  styleUrls: ['./pre-login-main-menu.component.css']
})
export class PreLoginMainMenuComponent implements OnInit {

  constructor(private msg: NzMessageService) {
  }

  ngOnInit(): void {
  }

  downloadApp() {
    this.msg.info(`Download our latest Mobile App from Google Playstore`);
  }
}
