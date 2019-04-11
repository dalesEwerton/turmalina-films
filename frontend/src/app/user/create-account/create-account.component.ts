import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
     })
  };

  public isLogin = false;

  constructor(public http: HttpClient) { }

  ngOnInit() {
  }

  createUser(e) {
    e.preventDefault();

    const email = e.target.elements[0].value; 
    const name = e.target.elements[1].value;
    const username = e.target.elements[2].value;
    const password = e.target.elements[3].value;
    const cpassword = e.target.elements[4].value;

    let created = false;

    if (password === cpassword) {
    	const apiRoute = 'http://localhost:3000/user/';
    	const body = {
    		name: name,
    		email: email,
    		username: username,
    		password: password
    	};
    	const request = this.http.post(apiRoute, body, this.httpOptions);


    	request.subscribe(
			(response) => {
				alert('Pronto, você agora pode realizar login');
        window.location.reload();
			}, (err) => {
				alert(err['error']['error']);
			}
    	);

      
    }else {
      alert('As senhas não conferem!');
    }
  }

  gotoLogin() {
    this.isLogin = true
  }

}
