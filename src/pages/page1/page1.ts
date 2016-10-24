import { Component } from '@angular/core';

import { NavController , NavParams} from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  username: any;
  email: any;
  firstName: any;
  lastName : any;

  constructor(public navCtrl: NavController) {

    this.username = window.localStorage.getItem("username");
    this.email = window.localStorage.getItem("email");
    this.firstName = window.localStorage.getItem("firstName");
    this.lastName = window.localStorage.getItem("lastName");

  }

}
