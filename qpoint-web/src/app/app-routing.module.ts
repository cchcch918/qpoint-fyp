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
    path: 'dashboard',
    loadChildren: () => import('./main-dashboard/main-dashboard.module').then(mod => mod.MainDashboardModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(mod => mod.StudentModule)
  },
  {
    path: 'staff',
    loadChildren: () => import('./staff/staff.module').then(mod => mod.StaffModule)
  },
  {
    path: 'group',
    loadChildren: () => import('./group/group.module').then(mod => mod.GroupModule)
  },
  {
    path: 'class',
    loadChildren: () => import('./class/class.module').then(mod => mod.ClassModule)
  },
  {
    path: 'behaviour',
    loadChildren: () => import('./behaviour/behaviour.module').then(mod => mod.BehaviourModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(mod => mod.NotificationModule)
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
