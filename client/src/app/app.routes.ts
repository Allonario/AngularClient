import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./pages/profile/profile.component";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./pages/login/login.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {FriendsComponent} from "./pages/friends/friends.component";
import {NewsComponent} from "./pages/news/news.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'profile/:id/friends', component: FriendsComponent},
  {path: 'profile/:id/news', component: NewsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
