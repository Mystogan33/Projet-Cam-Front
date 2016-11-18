import { Component } from '@angular/core';
import { NavController , NavParams , ModalController } from 'ionic-angular';
import {ListeUtilisateurCamera} from '../liste-utilisateur-camera/liste-utilisateur-camera';
import {ModalDeconnexion} from '../modal-deconnexion/modal-deconnexion';
import {PageConnexion} from '../connexion/connexion';
import {HomePage} from '../home/home';
import {ServProvider} from '../../providers/serv-provider';


/*
  Generated class for the GestionCamera page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gestion-camera',
  templateUrl: 'gestion-camera.html',
  providers: [ServProvider]
})
export class GestionCamera {

  username : any;

  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams , public modalCtrl : ModalController , public serv : ServProvider) {

    this.items = [];
    this.isConnected();
    this.username = window.localStorage.getItem("username");

  }

  itemTapped(event, item) {

    this.navCtrl.push(ListeUtilisateurCamera, {
    camera : item
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

  addCamera(){

    let camera = 'Camera #'+ Math.floor(Math.random() * 10);

    this.serv.addCamera(JSON.stringify({camera : camera})).subscribe(

      data => {

        console.log("Caméra ajouté")

      },
      err => {

        console.log("Erreur ajout camera")

      },
      () => console.log("")
    );

    //Mock data

    this.items.push({
      title: camera,
      note: 'Gérer la '+ camera,
      icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    });

    
  }

  removeCamera(camera) {
    let index = this.items.indexOf(camera);
    this.items.splice(index,1);
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

      // Let's populate this page with some filler content for funzies
      this.icons = ['camera'];

      for (let i = 1; i < 4; i++) {
        this.items.push({
          title: 'Caméra ' + i,
          note: 'Gérer la camera#' + i,
          icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        });
      }
    }

  }

}
