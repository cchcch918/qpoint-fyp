import {NgModule} from "@angular/core";
import {LoginFormComponent} from "./component/login-form/login-form.component";

import {PreLoginRoutingModule} from "./pre-login.routing.module";
import {LoginService} from "../core/service/login.service";
import {CoreModule} from "../core/core.module";
import {RegisterFormComponent} from "./component/register-form/register-form.component";
import {PasswordRecoveryFormComponent} from './component/password-recovery-form/password-recovery-form.component';
import {ForgetPasswordVerificationComponent} from "./component/forget-password-verification/forget-password-verification.component";


@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    PasswordRecoveryFormComponent,
    ForgetPasswordVerificationComponent
  ],
  imports: [
    CoreModule,
    PreLoginRoutingModule,
  ],
  providers: [LoginService],

})
export class PreLoginModule {

}
