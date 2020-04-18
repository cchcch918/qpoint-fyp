import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginFormComponent} from "./component/login-form/login-form.component";
import {RegisterFormComponent} from "./component/register-form/register-form.component";
import {PasswordRecoveryFormComponent} from "./component/password-recovery-form/password-recovery-form.component";
import {ForgetPasswordVerificationComponent} from "./component/forget-password-verification/forget-password-verification.component";

const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
  },
  {
    path: 'register-admin',
    component: RegisterFormComponent,
  },
  {
    path: 'forget-password',
    component: ForgetPasswordVerificationComponent,
  },
  {
    path: 'password-recovery/:username/:resetPasswordToken',
    component: PasswordRecoveryFormComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreLoginRoutingModule {
}
