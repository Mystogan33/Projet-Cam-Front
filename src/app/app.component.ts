import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { GestionCamera } from '../pages/gestion-camera/gestion-camera';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //Définition de la page de lancement
  rootPage: any = HomePage;

  // Définition d'une page
  pages: Array<{title: string, component: any , icon: any , droit : any}>;

  constructor(public platform: Platform) {

    //Initialisation de l'application
    this.initializeApp();

    // Pages de l'application
    this.pages = [
      { title: 'Accueil', component: HomePage , icon: "md-home" , droit : true},
      { title: 'Mon Compte', component: Page1 , icon: "person"  , droit : true},
      { title: 'Visualiser une caméra', component: Page2 , icon: "camera" , droit : true},
      { title: 'Gérer les caméras', component: GestionCamera , icon : "cog" , droit : false }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
