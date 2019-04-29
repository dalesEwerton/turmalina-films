import { Component, OnInit } from '@angular/core';
import { RecommendationService } from './recommendation.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {


  allFilms: any;
  viewFilms: any;
  indexPagination: number;
  setPage: number;

  constructor(private recommendationService: RecommendationService) { }

  ngOnInit() {
    this.allFilms = {};
    this.indexPagination = 0;
    this.setPage = 1;
    this.getFilms();
  }

  getFilms() {
    this.recommendationService.getFilms().subscribe((response) => {
      this.allFilms = response['films'];
      this.viewFilms = response['films'].slice(0,9);
    }, (err) => {
      console.log(err);
    });
  }


  loadFilms() {    
    this.recommendationService.loadFilms().subscribe((response) => {
      alert('Login Filmes carregados com sucesso.');
    }, (err) => {
      console.log(err);
    });
  }


  nextPages() {
    this.indexPagination += 3;
    
    const next = ((this.setPage - 1) + this.indexPagination) * 9;
    this.viewFilms = this.allFilms.slice(next, next + 9)   
  }

  previousPages() {
    if(this.indexPagination - 3 < 0) {
      alert('Não é possível voltar nas páginas');
    } else {
      this.indexPagination -= 3;
    
      const next = this.nextElement();
      this.viewFilms = this.allFilms.slice(next, next + 9)   
    }
  }

  seletecPage(num) {
    this.setPage = num;
    const next = this.nextElement();
    this.viewFilms = this.allFilms.slice(next, next + 9);
    console.log(num);
  }


  private nextElement() {
    return ((this.setPage - 1) + this.indexPagination) * 9;
  }

  removeMovie(film) {
    this.viewFilms = this.viewFilms.filter((elem) => {
      return elem !== film;
    })
    this.allFilms = this.allFilms.filter((elem) => {
      return elem !== film;
    })
  }

  rateMovie(rating) {
    this.recommendationService.rateFilm(rating).subscribe((response) => {
      console.log(response);
    })
  }
}
