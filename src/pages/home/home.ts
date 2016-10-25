import { Component } from '@angular/core';
import { ServProvider } from '../../providers/serv-provider';
import { NavController , AlertController , ModalController , ViewController} from 'ionic-angular';
import { PageConnexion } from '../connexion/connexion';
import { ModalDeconnexion } from '../modal-deconnexion/modal-deconnexion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers : [ServProvider]
})
export class HomePage {

  menuIsHidden: boolean = false;

  constructor(public navCtrl: NavController , public viewCtrl: ViewController , public modalCtrl : ModalController , public serv : ServProvider , public alertCtrl : AlertController) {

    this.isConnected();

  }


  logOut()
  {
    let confirm = this.modalCtrl.create(ModalDeconnexion);

    confirm.onDidDismiss(data => {

      this.isConnected();

    });

    confirm.present();

  }

  isConnected()
  {
    if(window.localStorage.getItem("Token")== null)
    {
      let modal = this.modalCtrl.create(PageConnexion);
      modal.present();
    }

  }

}
