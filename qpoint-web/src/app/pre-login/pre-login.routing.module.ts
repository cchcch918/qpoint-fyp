import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginFormComponent} from "./component/login-form/login-form.component";

const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
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
