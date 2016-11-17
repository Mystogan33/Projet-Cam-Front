import { Component } from '@angular/core';
import { NavController , ViewController } from 'ionic-angular';

/*
  Generated class for the ModalInscription page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal-inscription',
  templateUrl: 'modal-inscription.html'
})
export class ModalInscription {

  username : any;
  password : any;
  mail : any;
  lastname : any;
  firstname : any;

  constructor(public navCtrl: NavController , public viewCtrl : ViewController) {}

  ionViewDidLoad() {
    console.log('Page d\'inscription');
  }

  dismissCancel()
  {
    this.navCtrl.pop();
  }

  dismiss()
  {
    let data = JSON.stringify({username: this.username , password: this.password , email: this.mail , firstName: this.firstname , lastName: this.lastname});
    this.viewCtrl.dismiss(data);
  }


}
