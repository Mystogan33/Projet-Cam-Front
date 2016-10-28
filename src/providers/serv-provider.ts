import { Injectable } from '@angular/core';
import { Http , Headers , RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class ServProvider {

  data: any;

  constructor(public http: Http) {
  }

  Inscription(body): Observable<any> {

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});


    return this.http.post('http://localhost:1337/auth/signup', body , options)
    .map(res => res.json());

    }


  Connexion(body): Observable<any> {

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers});

   return this.http.post('http://localhost:1337/auth/signin', body , options)
    .map(res => res.json())

  }

  }
