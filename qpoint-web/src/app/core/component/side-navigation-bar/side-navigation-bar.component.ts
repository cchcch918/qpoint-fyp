import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-navigation-bar',
  templateUrl: './side-navigation-bar.component.html',
  styleUrls: ['./side-navigation-bar.component.css']
})
export class SideNavigationBarComponent implements OnInit {
  routes: string[];
  isCollapsed = false;
  innerWidth: any;
  menuWidth: number = 82;
  foldIcon: string = 'menu-fold'
  private WIDTH_BREAKPOINT = 500;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;

    this.routes = (this.router.url.split('/'));
    this.routes.shift();
    this.routes = this.routes.map(route => {
      return route.replace(/-/g, ' ');
    })
  }

  checkSubMenuOpen(menuTitle: string) {
    return this.router.url.split('/')[1].includes(menuTitle);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  menuCollapsed() {
    if (this.innerWidth < this.WIDTH_BREAKPOINT) {
      this.isCollapsed = true;
      if (this.menuWidth == 0) {
        this.menuWidth = 82;
        this.foldIcon = 'menu-fold'

      } else {
        this.menuWidth = 0
        this.foldIcon = 'menu-unfold'
      }
    } else {
      this.menuWidth = 82;
      this.isCollapsed = !this.isCollapsed
      this.isCollapsed ? this.foldIcon = 'menu-unfold' : this.foldIcon = 'menu-fold';
    }

  }
}

