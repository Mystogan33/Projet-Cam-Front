import { Component } from '@angular/core';
import { NavController , ViewController } from 'ionic-angular';


@Component({
  selector: 'page-modal-deconnexion',
  templateUrl: 'modal-deconnexion.html'
})
export class ModalDeconnexion {

  constructor(public navCtrl: NavController , public modalCtrl : ViewController) {}

  ionViewDidLoad() {
    console.log('Déconnexion');
  }

  logOut()
  {
    console.log("Déconnexion");
    window.localStorage.removeItem("Token");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("firstName");
    window.localStorage.removeItem("lastName");

    this.modalCtrl.dismiss();
  }

  dismissCancel()
  {
    this.navCtrl.pop();
  }

}
