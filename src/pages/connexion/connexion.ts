import { Component } from '@angular/core';

import { NavController , AlertController , ModalController , ViewController } from 'ionic-angular';

import {ServProvider} from '../../providers/serv-provider';

import {ModalInscription} from '../modal-inscription/modal-inscription';


@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
  providers: [ServProvider]
})

export class PageConnexion {

  identifier : any;
  password : any;

  bodyRequest : any;

  reponse : any;

  constructor(public navCtrl: NavController , public viewCtrl : ViewController , public serv : ServProvider , public alertCtrl : AlertController , public modalCtrl: ModalController) {


  }

  connexion(){

    this.bodyRequest = JSON.stringify({identifier : this.identifier , password : this.password});

    this.serv.Connexion(this.bodyRequest).subscribe(

      data => {

      this.reponse = data;
      localStorage.setItem('Token',this.reponse.token);
      localStorage.setItem('username',this.reponse.user.username);
      localStorage.setItem('email',this.reponse.user.email);
      localStorage.setItem('firstName',this.reponse.user.firstname);
      localStorage.setItem('lastName',this.reponse.user.lastname);
      localStorage.setItem('id',this.reponse.user.id);
      localStorage.setItem('Profil','Administrateur');

      this.viewCtrl.dismiss();

      },
      err => {

      this.showAlertError("Erreur Connexion");

    },
      () => console.log("Connexion établie")
    );

  }

  showAlertError(text) {
    let alert = this.alertCtrl.create({
      title: 'Oups :\'(',
      message : text,
      buttons: ['OK']
    });

    alert.present();
  }

  showModalInscription()
  {
    let modal = this.modalCtrl.create(ModalInscription);

    modal.onDidDismiss(data => {

        this.bodyRequest = data;
        this.identifier = JSON.parse(data).username;
        this.password = JSON.parse(data).password;
        this.inscription();

    });

    modal.present();

  }

  inscription(){

    this.serv.Inscription(this.bodyRequest).subscribe(
              data => {
                localStorage.setItem('Token',data.token);
                this.connexion();
              },
              err => {
                this.showAlertError("Erreur Inscription");
              },
              () => console.log("Inscription réussie")
            );
         }
}
