import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { AccountsService } from './services/accounts.service';
import { authServiceConfig } from '../environments/environment';
import { LoginPageComponent } from './component/login/login-page.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CreateNewRetrospectiveComponent } from './component/create-new-retrospective/create-new-retrospective.component';
import { CreateTeamComponent } from './component/create-team/create-team.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { TimelineComponent } from './component/timeline/timeline.component';
import { RetroGamesService } from './services/retro-games.service';
import { LayoutComponent } from './component/layout/layout.component';
import { PlayGameComponent } from './component/play-game/play-game.component';
import { RetroGameCardComponent } from './component/retro-game-card/retro-game-card.component';
import { AddNoteComponent } from './component/add-note/add-note.component';
import { CustomTemplateComponent } from './component/templates/custom-template.component';
import { GameSectionComponent } from './component/game-section/game-section.component';
import { NoteComponent } from './component/note/note.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NavbarComponent } from './component/navbar/navbar.component';
import { EditTeamComponent } from './component/edit-team/edit-team.component';

function provideConfig() {
  return authServiceConfig;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    CreateTeamComponent,
    TimelineComponent,
    LayoutComponent,
    RetroGameCardComponent,
    CreateTeamComponent,
    CreateNewRetrospectiveComponent,
    CreateTeamComponent,
    TimelineComponent,
    PlayGameComponent,
    RetroGameCardComponent,
    AddNoteComponent,
    CustomTemplateComponent,
    GameSectionComponent,
    NoteComponent,
    NavbarComponent,
    EditTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule.initialize(authServiceConfig),
    FormsModule,
    NgxSmartModalModule.forRoot()
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