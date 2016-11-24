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
    localStorage.removeItem('Token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('Profil');

    this.modalCtrl.dismiss();
  }

  dismissCancel()
  {
    this.navCtrl.pop();
  }

}
