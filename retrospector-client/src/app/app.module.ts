import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
import { TimelineComponent } from './component/timeline/timeline.component';
import { RetroGamesService } from './services/retro-games.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule.initialize(authServiceConfig)
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }, AccountsService, RetroGamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
