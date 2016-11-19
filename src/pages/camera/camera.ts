import { Component } from '@angular/core';
import { NavController , NavParams , ModalController } from 'ionic-angular';
import { PageConnexion } from '../connexion/connexion';
import { ModalDeconnexion } from '../modal-deconnexion/modal-deconnexion';
import { ServProvider } from '../../providers/serv-provider';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
  providers: [ServProvider]
})
export class Camera {

  // Id de la caméra
  idCamera : any;

  constructor(public navCtrl: NavController , public nav:NavParams , public modalCtrl : ModalController , public serv : ServProvider) {

    // Récupération de la caméra selectionnée sur la page précédente
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
    if(window.localStorage.getItem('Token')== null)
    {
      let modal = this.modalCtrl.create(PageConnexion);
      modal.present();
    }
    else
    {

    }

  }

  moveLeft(){
    this.serv.moveCameraLeft(this.idCamera,window.localStorage.getItem('Token')).subscribe(

      data => {

        console.log(data)
      },
      err => {

        console.log("Erreur")

      },
      () => console.log("Caméra déplacé")
    );
  }

  moveCenter(){
    this.serv.moveCameraCenter(this.idCamera,window.localStorage.getItem('Token')).subscribe(

      data => {

        console.log(data);
      },
      err => {

        console.log("Erreur")

      },
      () => console.log("Caméra déplacé")
    );
  }

  moveRight(){
    this.serv.moveCameraRight(this.idCamera,window.localStorage.getItem('Token')).subscribe(

      data => {
        console.log(data);
      },
      err => {

        console.log("Erreur")

      },
      () => console.log("Caméra déplacé")
    );

  }

}
