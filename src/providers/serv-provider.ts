import { Injectable } from '@angular/core';
import { Http , Headers , RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class ServProvider {

  data: any;
  cameras : Array<{title: string, note: string, icon: string}>;

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

  getCameras(): Observable<any> {

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});


    return this.http.get('http://localhost:1337/camera/get',options)
    .map(res => res.json());

  }

  addCamera(camera): Observable<any> {

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});


    return this.http.post('http://localhost:1337/camera/add',camera,options)
    .map(res => res.json());

    }

    moveCameraLeft(camera): Observable<any> {

      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});


      return this.http.get('http://localhost:1337/camera/'+camera+'/move/left',options)
      .map(res => res.json());

    }

    moveCameraCenter(camera): Observable<any> {

      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});


      return this.http.get('http://localhost:1337/camera/'+camera+'/move/center', options)
      .map(res => res.json());

    }

    moveCameraRight(camera): Observable<any> {

      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});


      return this.http.get('http://localhost:1337/camera/'+camera+'/move/right',options)
      .map(res => res.json());

    }

  }
