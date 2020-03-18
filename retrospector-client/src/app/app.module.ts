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

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent
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
    }, AccountsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
