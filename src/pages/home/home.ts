import { Component } from '@angular/core';
import { ServProvider } from '../../providers/serv-provider';
import { NavController , AlertController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers : [ServProvider]
})
export class HomePage {

  constructor(public navCtrl: NavController , public serv : ServProvider , public alertCtrl : AlertController) {

    this.navCtrl = navCtrl;
    this.serv = serv;
    this.alertCtrl = alertCtrl;

  }

  logOut()
  {
    this.confirmLogOut();
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
