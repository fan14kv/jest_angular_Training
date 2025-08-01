import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './user/users/users.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserCardComponent } from './user/user-card/user-card.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
