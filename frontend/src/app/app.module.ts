import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import { BarRatingModule } from "ngx-bar-rating";
import {MatGridListModule} from '@angular/material/grid-list'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './nav/sidenav/sidenav.component';
import { RecommendationComponent } from './films/recomendation/recommendation.component';
import { QuestionnarieComponent } from './films/questionnarie/questionnarie.component';
import { CreateAccountComponent } from './user/create-account/create-account.component';
import { LoginComponent } from './user/login/login.component';
import { FilmCardComponent } from './films/recomendation/film-card/film-card.component';
import { RecommendationService } from './films/recomendation/recommendation.service';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    RecommendationComponent,
    QuestionnarieComponent,
    CreateAccountComponent,
    LoginComponent,
    FilmCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatSliderModule,
    BarRatingModule,
    BrowserAnimationsModule,
    MatGridListModule
  ],
  providers: [RecommendationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
