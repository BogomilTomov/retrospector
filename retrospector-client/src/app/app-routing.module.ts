import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './component/login/login-page.component';
import { AuthGuard } from './services/auth/auth.guard'
import { PlayGameComponent } from './component/play-game/play-game.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CustomTemplateComponent } from './component/templates/custom-template.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'play', component: PlayGameComponent },
  { path: 'play/custom', component: CustomTemplateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }