import { Component } from '@angular/core';

import {ModalDeconnexion} from '../modal-deconnexion/modal-deconnexion';
import {PageConnexion} from '../connexion/connexion';
import {HomePage} from '../home/home';
import {Camera} from '../camera/camera';

import { NavController, NavParams , ModalController} from 'ionic-angular';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {

  username : any;

  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams , public modalCtrl : ModalController) {

    this.isConnected();
    this.username = window.localStorage.getItem("username");

  }

  afficherCamera(event, item) {

    this.navCtrl.push(Camera, {
      item: item
    });
  }

  logOut()
  {

    let confirm = this.modalCtrl.create(ModalDeconnexion)

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

      modal.onDidDismiss(data => {
          this.navCtrl.setRoot(HomePage);
      });
      modal.present();
    }
    else
    {

      // Let's populate this page with some filler content for funzies
      this.icons = ['camera'];

      this.items = [];
      for (let i = 1; i < 11; i++) {
        this.items.push({
          title: 'Caméra ' + i,
          note: 'Voir la caméra #' + i,
          icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        });
      }
    }

  }
}
