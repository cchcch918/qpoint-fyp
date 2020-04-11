import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'pre-login',
    pathMatch: 'full'
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then(mod => mod.TestModule)
  },
  {
    path: 'pre-login',
    loadChildren: () => import('./pre-login/pre-login.module').then(mod => mod.PreLoginModule)
  },
  {
    path: '**',
    redirectTo: 'pre-login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
