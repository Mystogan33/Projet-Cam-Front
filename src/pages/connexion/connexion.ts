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
      window.localStorage.setItem('Token',this.reponse.token);
      window.localStorage.setItem('username',this.reponse.user.username);
      window.localStorage.setItem('email',this.reponse.user.email);
      window.localStorage.setItem('firstName',this.reponse.user.firstname);
      window.localStorage.setItem('lastName',this.reponse.user.lastname);

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
                window.localStorage.setItem('Token',data.token);
                this.connexion();
              },
              err => {
                this.showAlertError("Erreur Inscription");
              },
              () => console.log("Inscription réussie")
            );
         }
}
