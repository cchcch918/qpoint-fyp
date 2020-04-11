import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {LoginFormComponent} from "./component/login-form/login-form.component";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {ReactiveFormsModule} from "@angular/forms";
import {PreLoginRoutingModule} from "./pre-login.routing.module";
import {LoginService} from "../core/service/login.service";
import {CoreModule} from "../core/core.module";


@NgModule({
  declarations: [
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    PreLoginRoutingModule,
  ],
  providers: [LoginService],

})
export class PreLoginModule {

}
