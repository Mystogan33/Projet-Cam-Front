import { Component } from '@angular/core';
import { NavController , ModalController} from 'ionic-angular';
import {PageConnexion} from '../connexion/connexion';
import {ModalDeconnexion} from '../modal-deconnexion/modal-deconnexion';
import {HomePage} from '../home/home';
import {ServProvider} from '../../providers/serv-provider';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers: [ServProvider]
})
export class Page1 {

  username: any;
  email: any;
  firstName: any;
  lastName : any;
  profil : any;
  id : any;

  infos : any;
  reponse : any;

  constructor(public navCtrl: NavController , public modalCtrl : ModalController , public serv : ServProvider) {

    this.isConnected();

  }

  getMyProfile(){

    this.serv.getMyProfile().subscribe(

      data => {

      this.reponse = data;
      window.localStorage.setItem('username',this.reponse.user.username);
      window.localStorage.setItem('email',this.reponse.user.email);
      window.localStorage.setItem('firstName',this.reponse.user.firstname);
      window.localStorage.setItem('lastName',this.reponse.user.lastname);
      window.localStorage.setItem('id',this.reponse.user.id);
      window.localStorage.setItem('Profil','Administrateur');

      this.infos = [
          {title: 'Prénom' , content : this.firstName , icon: "information-circle" },
          {title: 'Nom' , content : this.lastName , icon: "information-circle" },
          {title: 'Mail' , content : this.email , icon: "mail"},
          {title: 'Profil' , content : this.profil , icon: "contacts"}
        ];

      },
      err => {

      alert("Erreur lors de la récupération de votre profil");

    },
      () => console.log("Ok")
    );

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
    if(window.localStorage.getItem('Token')== null)
    {
      let modal = this.modalCtrl.create(PageConnexion);
      modal.onDidDismiss(data => {
          this.navCtrl.setRoot(HomePage);
      });
      modal.present();
    }
    else
    {

      this.getMyProfile();
      this.username = localStorage.getItem('username');
      this.email = localStorage.getItem('email');
      this.firstName = localStorage.getItem('firstName');
      this.lastName = localStorage.getItem('lastName');
      this.id = localStorage.getItem('id');
      this.profil = localStorage.getItem('Profil');

      this.infos = [
          {title: 'Prénom' , content : this.firstName , icon: "information-circle" },
          {title: 'Nom' , content : this.lastName , icon: "information-circle" },
          {title: 'Mail' , content : this.email , icon: "mail"},
          {title: 'Profil' , content : this.profil , icon: "contacts"}
        ];
    }
  }

}
