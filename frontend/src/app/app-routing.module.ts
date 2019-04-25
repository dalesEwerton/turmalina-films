import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecomendationComponent } from './films/recomendation/recomendation.component';
import { QuestionnarieComponent } from './films/questionnarie/questionnarie.component';
import { CreateAccountComponent } from './user/create-account/create-account.component';
import { LoginComponent } from './user/login/login.component';
import { FilmCardComponent } from './films/recomendation/film-card/film-card.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'home', component: RecomendationComponent },
	{ path: 'questionnarie', component: QuestionnarieComponent},
	{ path: 'film', component: FilmCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
