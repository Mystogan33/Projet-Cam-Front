import { Component } from '@angular/core';

import { NavController , AlertController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController , public alertCtrl : AlertController) {

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
