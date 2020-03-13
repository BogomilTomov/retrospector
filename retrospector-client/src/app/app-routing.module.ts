import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './component/login/login-page.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './component/dashboard/dashboard.component';

const routes: Routes = [
{ path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }