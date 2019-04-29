import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit {

  private rate: Number = 0;

  @Input() private film;

  @Output() hideMovie = new EventEmitter();

  @Output() rateMovie = new EventEmitter();

  constructor() { }

  ngOnInit() {  }

  submitRating(){
    this.rateMovie.emit({userId: localStorage.getItem('userId'), filmId: this.film._id, rate: this.rate, comment: ''});
    this.hideMovie.emit(this.film);
  }

  remove() {
    this.hideMovie.emit(this.film);
  }

}
