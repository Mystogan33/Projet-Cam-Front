import { Component } from '@angular/core';
import { ServProvider } from '../../providers/serv-provider';
import { NavController , AlertController , ModalController} from 'ionic-angular';
import { PageConnexion } from '../connexion/connexion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers : [ServProvider]
})
export class HomePage {

  constructor(public navCtrl: NavController , public modalCtrl : ModalController , public serv : ServProvider , public alertCtrl : AlertController) {

    this.isConnected();

  }

  logOut()
  {
    this.confirmLogOut();

  }

  isConnected()
  {
    if(window.localStorage.getItem("token") !== undefined )
    {
        let modal = this.modalCtrl.create(PageConnexion);
        modal.present();
    }

  }

  confirmLogOut(){
    let confirm = this.alertCtrl.create({

      title : 'Vous partez ? :(',
      message : 'Vous souhaitez vous déconnecter ? ',
      buttons : [
        {
          text : 'Oui',
          handler : () => {
            console.log("Déconnexion");
            window.localStorage.removeItem("token");
            this.isConnected();
          }
        },
        {
          text : 'Non',
          handler : () => {

          }
        }
      ]
    });
    confirm.present();
  }

}
