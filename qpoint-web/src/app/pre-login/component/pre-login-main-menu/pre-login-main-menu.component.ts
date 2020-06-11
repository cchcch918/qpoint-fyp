import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pre-login-main-menu',
  templateUrl: './pre-login-main-menu.component.html',
  styleUrls: ['./pre-login-main-menu.component.css']
})
export class PreLoginMainMenuComponent implements OnInit {
  imageSrcArray: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.imageSrcArray.push("../../../../assets/qpoint-logo.png")
  }

}
