import { Component } from '@angular/core';

import { NavController , AlertController } from 'ionic-angular';

import {ServProvider} from '../../providers/serv-provider';

import {HomePage} from '../home/home';

@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
  providers: [ServProvider]
})

export class PageConnexion {

  identifier : any;

  username : any;
  password : any;
  mail : any;
  lastname : any;
  firstname : any;

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
                localStorage.setItem("token",this.reponseToken);
                this.showAlertConnexion();
                this.navCtrl.push(HomePage);
              });

    }

  showAlertConnexion() {
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

  showAlertInscription()
  {
    let prompt = this.alertCtrl.create({

      title: 'Inscription',
      message : 'Veuillez remplir les champs suivant afin de vous inscrire',
      inputs: [
        {
          name : 'username',
          placeholder : 'Username',
        },
        {
          name : 'password',
          type: 'password',
          placeholder : 'Mot de passe'

        },
        {
          name : 'email',
          placeholder : 'Mail',
        },
        {
          name : 'firstname',
          placeholder : 'Prénom'
        },
        {
          name : 'lastname',
          placeholder : 'Nom'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text : 'S\'inscrire',
          handler: data => {
            this.username = data.username;
            this.password = data.password;
            this.mail = data.email;
            this.firstname = data.firstname;
            this.lastname = data.lastname;

            this.inscription();
          }
        }
      ]
    });
    prompt.present();
  }

  inscription(){

    var body = JSON.stringify({username: this.username , password: this.password , email: this.mail , firstName: this.firstname , lastName: this.lastname});

    console.log(body);

    this.serv.Inscription(body)
              .then(data => {
                console.log(data);
                this.reponse = data;
                this.reponseUser = this.reponse.user;
                this.reponseToken = this.reponse.token;
                localStorage.setItem('token',this.reponseToken);
              });



         }
}
