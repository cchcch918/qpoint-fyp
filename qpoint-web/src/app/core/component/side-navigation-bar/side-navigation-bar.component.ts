import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-side-navigation-bar',
  templateUrl: './side-navigation-bar.component.html',
  styleUrls: ['./side-navigation-bar.component.css']
})
export class SideNavigationBarComponent implements OnInit {
  isCollapsed = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
