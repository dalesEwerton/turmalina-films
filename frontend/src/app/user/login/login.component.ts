import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isCreate = false;

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
     })
  };


  constructor(public http: HttpClient,
  			  public router: Router) { }

  ngOnInit() {
  }

   login(e) {

   	const apiRoute = 'http://localhost:3000/user/login';

    e.preventDefault();

    const username = e.target.elements[0].value;
    const password = e.target.elements[1].value;

    const request = this.http.post(apiRoute, {username: username, password: password}, this.httpOptions);
    request.subscribe(
    	(response) => {
        console.log( response['user']['_id']);
        localStorage.setItem('userId', response['user']['_id']);
    		localStorage.setItem('token', response['token']);
    		alert('Login realizado.');
    		this.router.navigate(['home']);
    	}, (err) => {
    		alert(err['error']['error']);
    	}
    );
  }


  createAccount() {
    this.isCreate = true;
  }

}
