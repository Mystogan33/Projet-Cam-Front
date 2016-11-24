import { Component } from '@angular/core';
import { NavController , AlertController , NavParams , ModalController } from 'ionic-angular';
import {ListeUtilisateurCamera} from '../liste-utilisateur-camera/liste-utilisateur-camera';
import {ModalDeconnexion} from '../modal-deconnexion/modal-deconnexion';
import {PageConnexion} from '../connexion/connexion';
import {HomePage} from '../home/home';
import {ServProvider} from '../../providers/serv-provider';

@Component({
  selector: 'page-gestion-camera',
  templateUrl: 'gestion-camera.html',
  providers: [ServProvider]
})

export class GestionCamera {

  icons: string[];
  //items: Array<{title: string, note: string, icon: string}>;
  cameraList : any;

  constructor(public navCtrl: NavController, public navParams: NavParams , public modalCtrl : ModalController , public serv : ServProvider , public alertCtrl : AlertController) {

    this.cameraList = [];
    this.isConnected();

  }

  itemTapped(event, item) {

    this.navCtrl.push(ListeUtilisateurCamera, {
    camera : item
    });
  }

  getMyCameras() {

    this.serv.getMyCameras().subscribe(

      data => {
        
      this.cameraList = data.content;

      /*for (let i = 1; i < 11; i++) {
        this.items.push({
          title: 'Caméra ' + i,
          note: 'Gérer la camera#' + i,
          icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        });
      }*/

      },
      err => {

      alert("Erreur de la récupération des caméras");

    },
      () => console.log("Connexion établie")
    );

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

    var camera;

    let prompt = this.alertCtrl.create({
   title: 'Ajout d\'une caméra',
   inputs: [
     {
       name: 'NomCamera',
       placeholder: 'Nom de la caméra'
     },
   ],
   buttons: [
     {
       text: 'Cancel',
       handler: data => {
         console.log('Cancel clicked');
       }
     },
     {
       text: 'Ajouter',
       handler: data => {
         console.log('Saved clicked');
         camera = data.NomCamera;
             this.cameraList.push({
               camera: camera,
               note: 'Gérer la '+ camera,
               icon: this.icons[Math.floor(Math.random() * this.icons.length)]
             });
       }
     }
   ]
 });
 prompt.present();

    this.serv.addCamera(JSON.stringify({camera : camera})).subscribe(

      data => {

        console.log("Caméra ajouté")

      },
      err => {

        console.log("Erreur ajout camera")

      },
      () => console.log("")
    );

  }

  removeCamera(camera) {
    let index = this.cameraList.indexOf(camera);
    this.cameraList.splice(index,1);
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
      this.getMyCameras();
    }

  }

}
