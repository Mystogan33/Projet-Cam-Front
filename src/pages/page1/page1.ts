import { Component } from '@angular/core';

import { NavController , ModalController} from 'ionic-angular';

import {PageConnexion} from '../connexion/connexion';
import {ModalDeconnexion} from '../modal-deconnexion/modal-deconnexion';
import {HomePage} from '../home/home';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  username: any;
  email: any;
  firstName: any;
  lastName : any;
  profil : any;

  infos : any;

  constructor(public navCtrl: NavController , public modalCtrl : ModalController) {

    this.isConnected();

    this.profil = 'Administrateur';

    this.infos = [
        {title: 'Prénom' , content : this.firstName , icon: "information-circle" },
        {title: 'Nom' , content : this.lastName , icon: "information-circle" },
        {title: 'Mail' , content : this.email , icon: "mail"},
        {title: 'Profil' , content : this.profil , icon: "contacts"}
      ];


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
      modal.onDidDismiss(data => {
          this.navCtrl.setRoot(HomePage);
      });
      modal.present();
    }
    else
    {
      this.username = window.localStorage.getItem("username");
      this.email = window.localStorage.getItem("email");
      this.firstName = window.localStorage.getItem("firstName");
      this.lastName = window.localStorage.getItem("lastName");

    }
  }
}
