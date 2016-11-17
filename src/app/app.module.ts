import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { HomePage } from '../pages/home/home';
import { PageConnexion } from '../pages/connexion/connexion';
import { ModalInscription } from '../pages/modal-inscription/modal-inscription';
import { ModalDeconnexion } from '../pages/modal-deconnexion/modal-deconnexion';
import { GestionCamera } from '../pages/gestion-camera/gestion-camera';
import { ListeUtilisateurCamera }  from '../pages/liste-utilisateur-camera/liste-utilisateur-camera';
import { Camera } from '../pages/camera/camera';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    HomePage,
    PageConnexion,
    ModalInscription,
    ModalDeconnexion,
    GestionCamera,
    ListeUtilisateurCamera,
    Camera
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    HomePage,
    PageConnexion,
    ModalInscription,
    ModalDeconnexion,
    GestionCamera,
    ListeUtilisateurCamera,
    Camera
  ],
  providers: []
})
export class AppModule {}
