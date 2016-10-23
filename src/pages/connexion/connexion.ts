import { Component } from '@angular/core';

import { NavController , AlertController } from 'ionic-angular';

import {ServProvider} from '../../providers/serv-provider';

@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
  providers: [ServProvider]
})

export class PageConnexion {

  identifier : any;
  password : any;

  reponse : any;
  reponseUser : any;
  reponseToken : any;

  constructor(public navCtrl: NavController , public serv : ServProvider , public alertCtrl : AlertController) {

        this.navCtrl = navCtrl;
        this.serv = serv;
        this.alertCtrl = alertCtrl;

  }

  connexion(){

    var body = JSON.stringify({identifier: this.identifier , password: this.password})

    this.serv.Connexion(body)
              .then(data => {
                console.log(data);
                this.reponse = data;
                this.reponseUser = this.reponse.user;
                this.reponseToken = this.reponse.token;
                this.showAlert();
              });

    }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Connexion établie !',
      message : "Bienvenue " + this.reponseUser.username+" !" +
                "Votre email est : " + this.reponseUser.email +
                "Vous vous appelez " + this.reponseUser.firstName + " " + this.reponseUser.lastName +
                "Vous avez l'identifiant " + this.reponseUser.id +
                "Et votre token de connexion est le : "+this.reponseToken,
      buttons: ['OK']
    });
    alert.present();
  }

}
