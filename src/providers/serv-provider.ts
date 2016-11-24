import { Injectable } from '@angular/core';
import { Http , Headers , RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class ServProvider {

  data: any;
  cameras : Array<{title: string, note: string, icon: string}>;
  URL : any;

  constructor(public http: Http) {

    this.URL = 'http://192.168.43.102:1337';

  }

  // Fonctionnelle
  Inscription(body): Observable<any> {

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});


    return this.http.post(this.URL+'/auth/signup', body , options)
    .map(res => res.json());

  }

  // Fonctionelle
  Connexion(body): Observable<any> {

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.URL+'/auth/signin', body , options)
    .map(res => res.json())

  }

  // Fonctionelle
  getMyProfile(): Observable<any> {

    let token = localStorage.getItem('Token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', 'JWT ' + token);
    //let options = new RequestOptions({headers: headers});

    return this.http.get(this.URL+'/user/me',{headers: headers})
    .map(res => res.json());

  }

 // Non implémentée pour l'instant côté API
  addCamera(camera): Observable<any> {

    let headers = new Headers();

    let options = new RequestOptions({headers: headers});

    return this.http.post(this.URL+'/camera/add',{headers: headers})
    .map(res => res.json());

  }

  // Fonctionelle
  getMyCameras(): Observable<any> {

    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Token'));
    //let options = new RequestOptions({headers: headers});

    return this.http.get(this.URL+'/user/'+localStorage.getItem('id')+'/rights',{headers: headers})
    .map(res => res.json());

  }

  // En test
  addRightUser(user , camera , utilisateur): Observable<any> {

    let headers = new Headers();
    headers.append('Content-Type','application/json')
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Token'));
    //let options = new RequestOptions({headers: headers});

    return this.http.post(this.URL+'/user/'+utilisateur+'/addRight/'+camera+'/1',user,{headers: headers})
    .map(res => res.json());

  }

  // Fonctionelle
  moveCameraLeft(camera): Observable<any> {

    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Token'));
    //let options = new RequestOptions({headers: headers});

    return this.http.get(this.URL+'/camera/'+camera+'/move/left',{headers: headers})
    .map(res => res.json());

  }

  // Fonctionelle
  moveCameraCenter(camera): Observable<any> {

    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Token'));
    //let options = new RequestOptions({headers: headers});

    return this.http.get(this.URL+'/camera/'+camera+'/move/center',{headers: headers})
    .map(res => res.json());

  }

  // Fonctionelle
  moveCameraRight(camera): Observable<any> {

    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Token'));
    //let options = new RequestOptions({headers: headers});

    return this.http.get(this.URL+'/camera/'+camera+'/move/right',{headers: headers})
    .map(res => res.json());

  }

}
