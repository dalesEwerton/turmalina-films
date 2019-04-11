import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecomendationComponent } from './films/recomendation/recomendation.component';
import { QuestionnarieComponent } from './films/questionnarie/questionnarie.component';
import { CreateAccountComponent } from './user/create-account/create-account.component';

const routes: Routes = [
    { path: 'create', component: CreateAccountComponent},
	{ path: '', component: RecomendationComponent },
	{ path: 'questionnarie', component: QuestionnarieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
