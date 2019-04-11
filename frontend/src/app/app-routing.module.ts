import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecomendationComponent} from './films/recomendation/recomendation.component';

const routes: Routes = [
	{path: '', component: RecomendationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
