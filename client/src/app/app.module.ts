import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterOutlet} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app.routes";

import { AppComponent }   from './app.component';
import {ProfileComponent} from "./pages/profile/profile.component";
import {LoginComponent} from "./pages/login/login.component";
import {LoginService} from "./services/login.service";
import {UserService} from "./services/user.service";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {RegistrationService} from "./services/registration.service";
import {ProfilesService} from "./services/profiles.service";
import {ImageUploadComponent} from "./components/image-upload/image-upload.component";
import {IdService} from "./services/id.service";
import {LinkService} from "./services/link.service";
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";
import {NgOptimizedImage} from "@angular/common";
import {FriendsComponent} from "./pages/friends/friends.component";
import {NewsComponent} from "./pages/news/news.component";
import {NewsService} from "./services/news.service";
import {NewsModalComponent} from "./components/news-modal/news-modal.component";
import {SocketService} from "./services/socket.service";

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegistrationComponent,
    ImageUploadComponent,
    NavBarComponent,
    FriendsComponent,
    NewsComponent,
    NewsModalComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterOutlet,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],

  providers: [
    LoginService,
    UserService,
    RegistrationService,
    ProfilesService,
    IdService,
    LinkService,
    NewsService,
    SocketService
  ],

  bootstrap: [ AppComponent ]
})

export class AppModule { }
