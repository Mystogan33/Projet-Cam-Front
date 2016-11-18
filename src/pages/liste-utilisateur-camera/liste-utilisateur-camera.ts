import { Component } from '@angular/core';
import { NavController, NavParams , ModalController } from 'ionic-angular';
import { ModalDeconnexion } from '../modal-deconnexion/modal-deconnexion';
import { PageConnexion } from '../connexion/connexion';

/*
  Generated class for the ListeUtilisateurCamera page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-liste-utilisateur-camera',
  templateUrl: 'liste-utilisateur-camera.html'
})

export class ListeUtilisateurCamera {

  idCamera : any;
  Utilisateurs: any;
  InformationCamera : any;

  constructor(public navCtrl: NavController , public nav : NavParams , public modalCtrl : ModalController) {

    this.isConnected();

  }

  ionViewDidLoad() {
    console.log('Hello ListeUtilisateurCamera Page');
  }

  logOut(){
    let confirm = this.modalCtrl.create(ModalDeconnexion);

      confirm.onDidDismiss(data => {

        this.isConnected();

      });

        confirm.present();

    }

    supprimer(utilisateur)
    {
      let index = this.Utilisateurs.indexOf(utilisateur);
      this.Utilisateurs.splice(index,1);
    }

    ajouter()
    {
      let utilisateur = 'Utilisateur ' + Math.floor(Math.random() * 10);
      let profil = "Utilisateur";
      this.Utilisateurs.push({username: utilisateur , profil : profil , image : 'assets/img/batman.png'});
    }

    isConnected(){
      if(window.localStorage.getItem("Token")== null)
      {
        let modal = this.modalCtrl.create(PageConnexion);
        modal.present();
      }
      else
      {
        this.idCamera = this.nav.get('camera');

        this.Utilisateurs = [
          {username : 'SylvainGarnot' , profil : 'Admin' , mail : 'Sylvain.garnot@ynov.com' , image : 'assets/img/sylvain.jpg' },
          {username : 'IMikit' , profil : 'Admin' , mail : 'Mickael@ynov.com' , image : 'assets/img/mickael.png'},
          {username : 'Mystogan33' , profil : 'Admin' , mail : 'Valentin.gay@ynov.com' , image : 'assets/img/batman.png' },
          {username : 'LoicProust' , profil : 'Admin' , mail : 'Loic.proust@ynov.com' , image : 'assets/img/loic.jpg' }
        ];

        this.InformationCamera =  [
          {title: 'Nom de la caméra' , content : this.idCamera.title , icon: "information-circle" },
          {title: 'Localisation' , content : 'Salle G6' , icon: "locate" },
        ];

      }

      }

}
