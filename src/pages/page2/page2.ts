import { Component } from '@angular/core';

import {ModalDeconnexion} from '../modal-deconnexion/modal-deconnexion';
import {PageConnexion} from '../connexion/connexion';
import {HomePage} from '../home/home';

import { NavController, NavParams , ModalController , AlertController } from 'ionic-angular';

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

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Page2, {
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
      // If we navigated to this page, we will have an item available as a nav param
      this.selectedItem = this.navParams.get('item');

      // Let's populate this page with some filler content for funzies
      this.icons = ['camera'];

      this.items = [];
      for (let i = 1; i < 11; i++) {
        this.items.push({
          title: 'Caméra ' + i,
          note: 'This is camera#' + i,
          icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        });
      }
    }

  }
}
