import { Component , ViewChild, ElementRef } from '@angular/core';
import { ServProvider } from '../../providers/serv-provider';
import { NavController , AlertController , ModalController , ViewController , PopoverController , NavParams } from 'ionic-angular';
import { PageConnexion } from '../connexion/connexion';
import { ModalDeconnexion } from '../modal-deconnexion/modal-deconnexion';
import { UserPopOver } from '../user-pop-over/user-pop-over';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers : [ServProvider]
})
export class HomePage {

  username : any;

  selectedItem : any;
  icons : string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController , public navParams : NavParams , public viewCtrl: ViewController , public modalCtrl : ModalController , public serv : ServProvider , public alertCtrl : AlertController){

    this.isConnected();
    this.username = window.localStorage.getItem("username");

  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(HomePage, {
      item: item
    });
    }

  isConnected(){
    if(window.localStorage.getItem("Token")== null)
    {
      let modal = this.modalCtrl.create(PageConnexion);
      modal.present();
    }
    else
    {
      // If we navigated to this page, we will have an item available as a nav param
      this.selectedItem = this.navParams.get('item');

      // Let's populate this page with some filler content for funzies
      this.icons = ['camera'];

      this.items = [];
      for (let i = 1; i < 11; i++) {
        this.items.push({
          title: 'Caméra ' + i,
          note: 'This is camera#' + i,
          icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        });
      }
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
