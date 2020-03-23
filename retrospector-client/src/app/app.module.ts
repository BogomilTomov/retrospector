import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { AccountsService } from './services/accounts.service';
import { authServiceConfig } from '../environments/environment';

function provideConfig() {
  return authServiceConfig;
}

import { LoginPageComponent } from './component/login/login-page.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CreateTeamComponent } from './component/create-team/create-team.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { TimelineComponent } from './component/timeline/timeline.component';
import { RetroGamesService } from './services/retro-games.service';
import { SelectTeamComponent } from './component/select-team/select-team.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    CreateTeamComponent,
    TimelineComponent,
    SelectTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule.initialize(authServiceConfig),
    FormsModule 
  ],
  providers: [
    {  provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor ,
      multi: true
   },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }, AccountsService, RetroGamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
