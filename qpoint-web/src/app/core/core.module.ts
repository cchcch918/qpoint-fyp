import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SideNavigationBarComponent} from './component/side-navigation-bar/side-navigation-bar.component';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {RouterModule} from "@angular/router";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {ClipboardModule} from "@angular/cdk/clipboard";


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
    RouterModule,
  ],
  exports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    CoreComponent,
    Ng2SearchPipeModule,
    ClipboardModule,
  ]
})
export class CoreModule {
}
