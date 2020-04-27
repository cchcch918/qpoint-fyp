import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SideNavigationBarComponent} from './component/side-navigation-bar/side-navigation-bar.component';
import {NgZorroAntdModule} from "ng-zorro-antd";


let CoreComponent = [
  SideNavigationBarComponent,
]

@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
  ],
  exports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    CoreComponent,
  ]
})
export class CoreModule {
}
