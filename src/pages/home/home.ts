import { Component } from '@angular/core';
import { ServProvider } from '../../providers/serv-provider';
import { NavController , AlertController , ModalController , ViewController , NavParams } from 'ionic-angular';
import { PageConnexion } from '../connexion/connexion';
import { ModalDeconnexion } from '../modal-deconnexion/modal-deconnexion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers : [ServProvider]
})
export class HomePage {

  reponse : any;

  constructor(public navCtrl: NavController , public navParams : NavParams , public viewCtrl: ViewController , public modalCtrl : ModalController , public serv : ServProvider , public alertCtrl : AlertController){

    this.isConnected();

  }

  isConnected(){
    if(localStorage.getItem('Token')== null)
    {
      let modal = this.modalCtrl.create(PageConnexion);
      modal.present();
    }
    else
    {
      this.serv.getMyProfile().subscribe(

        data => {

        this.reponse = data;
        localStorage.setItem('username',this.reponse.user.username);
        localStorage.setItem('email',this.reponse.user.email);
        localStorage.setItem('firstName',this.reponse.user.firstname);
        localStorage.setItem('lastName',this.reponse.user.lastname);
        localStorage.setItem('id',this.reponse.user.id);
        localStorage.setItem('Profil','Administrateur');

        },
        err => {

        alert("Erreur lors de la récupération de votre profil");

      },
        () => console.log("Profil récupéré")
      );
    }

    }

  logOut(){
    let confirm = this.modalCtrl.create(ModalDeconnexion);

      confirm.onDidDismiss(data => {

        this.isConnected();

      });

        confirm.present();

    }

}
