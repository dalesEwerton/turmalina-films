import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-recomendation',
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.css']
})
export class RecomendationComponent implements OnInit {


  allFilms: any;
  viewFilms: any;
  indexPagination: number;
  setPage: number;

  constructor(public http: HttpClient) { }
  
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
     })
  };

  ngOnInit() {
    this.allFilms = {};
    this.indexPagination = 0;
    this.setPage = 1;
    this.getFilms();
  }

  getFilms() {
    const apiRoute = 'http://localhost:3000/film';
    const request = this.http.get(apiRoute, this.httpOptions);
    request.subscribe((response) => {
      this.allFilms = response['films'];
      this.viewFilms = response['films'].slice(0,9);
    }, (err) => {
      console.log(err);
    });
  }


  loadFilms() {
    const apiRoute = 'http://localhost:3000/film/load';
    const request = this.http.post(apiRoute, this.httpOptions);
    request.subscribe((response) => {
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
}
