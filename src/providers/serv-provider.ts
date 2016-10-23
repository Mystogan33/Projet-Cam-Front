import { Injectable } from '@angular/core';
import { Http , Headers , RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ServProvider {

  data: any;

  constructor(public http: Http) {
  }

  Inscription(body) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers: headers});

    if (this.data) {
        return Promise.resolve(this.data);
    }

  return new Promise(resolve => {

  this.http.post('http://localhost:1337/auth/signup', body , options)
    .map(res => res.json())
    .subscribe(data => {
      this.data = data;
      resolve(this.data);
    },error => {
      
    });
    });

  }

  Connexion(body) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    if (this.data) {
        return Promise.resolve(this.data);
    }

  return new Promise(resolve => {

  this.http.post('http://localhost:1337/auth/signin', body , options)
    .map(res => res.json())
    .subscribe(data => {
      this.data = data;
      resolve(this.data);
    },error => {

    });
    });

  }

  }
