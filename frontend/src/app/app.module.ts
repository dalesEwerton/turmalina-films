import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './nav/sidenav/sidenav.component';
import { RecomendationComponent } from './films/recomendation/recomendation.component';
import { QuestionnarieComponent } from './films/questionnarie/questionnarie.component';
import { CreateAccountComponent } from './user/create-account/create-account.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    RecomendationComponent,
    QuestionnarieComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
