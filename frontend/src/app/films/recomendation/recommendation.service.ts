import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
     })
  };

  constructor(public http: HttpClient) { }

  getFilms() {
    const apiRoute = 'http://localhost:3000/film';
    return this.http.get(apiRoute, this.httpOptions);    
  }
  
  loadFilms() {
    const apiRoute = 'http://localhost:3000/film/load';
    return this.http.post(apiRoute, this.httpOptions);
  }

  rateFilm(rating) {
    const apiRoute = 'http://localhost:3000/rating';
    return this.http.post(apiRoute, rating, this.httpOptions);
  }
}
