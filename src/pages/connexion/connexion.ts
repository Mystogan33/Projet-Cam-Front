import { Component } from '@angular/core';

import { NavController , AlertController , ModalController } from 'ionic-angular';

import {ServProvider} from '../../providers/serv-provider';

import {HomePage} from '../home/home';

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

  constructor(public navCtrl: NavController , public serv : ServProvider , public alertCtrl : AlertController , public modalCtrl: ModalController) {


  }

  connexion(){

    this.bodyRequest = JSON.stringify({identifier: this.identifier , password: this.password})

    this.serv.Connexion(this.bodyRequest).subscribe(

      data => {

      this.reponse = data;
      window.localStorage.setItem("Token",this.reponse.token);
      window.localStorage.setItem("username",this.reponse.user.username);
      window.localStorage.setItem("email",this.reponse.user.email);
      window.localStorage.setItem("firstName",this.reponse.user.firstName);
      window.localStorage.setItem("lastName",this.reponse.user.lastName);

      this.navCtrl.pop();

      },
      err => {

      this.showAlertError();

    },
      () => console.log(this.reponse.user.firstName + this.reponse.user.lastName)
    );

  }

  showAlertError() {
    let alert = this.alertCtrl.create({
      title: 'Oups :\'(',
      message : "Il semblerait qu'une erreur se soit produite",
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertSuccessInscription() {
    let alert = this.alertCtrl.create({
      title: 'Inscription',
      message : "Inscription validé !",
      buttons: ['OK']
    });
    alert.present();
  }

  showModalInscription()
  {
    let modal = this.modalCtrl.create(ModalInscription);

    modal.onDidDismiss(data => {
                        this.bodyRequest = data;
                        this.inscription();
                      });

    modal.present();

  }

  inscription(){

    console.log(this.bodyRequest);

    this.serv.Inscription(this.bodyRequest).subscribe(
              data => {
                console.log(data);
                this.reponse = data;
                window.localStorage.setItem("Token",this.reponse.token);
                this.showAlertSuccessInscription();
              },
              err => {
                this.showAlertError();
              },
              () => console.log("Inscription réussie")
            );
         }
}
