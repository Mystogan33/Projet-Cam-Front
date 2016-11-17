import { Component } from '@angular/core';
import { NavController , NavParams , ModalController } from 'ionic-angular';
import { PageConnexion } from '../connexion/connexion';
import { ModalDeconnexion } from '../modal-deconnexion/modal-deconnexion';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class Camera {

  idCamera : any;

  constructor(public navCtrl: NavController , public nav:NavParams , public modalCtrl : ModalController) {

    this.idCamera = this.nav.get('item');
  }

  ionViewDidLoad() {
    console.log('Page camera');
  }

  logOut()
  {
    let confirm = this.modalCtrl.create(ModalDeconnexion);

      confirm.onDidDismiss(data => {

        this.isConnected();

      });

        confirm.present();
  }

  isConnected(){
    if(window.localStorage.getItem("Token")== null)
    {
      let modal = this.modalCtrl.create(PageConnexion);
      modal.present();
    }
    else
    {

    }

  }

}
