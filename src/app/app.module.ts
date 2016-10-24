import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PageConnexion } from '../pages/connexion/connexion';
import { ModalInscription } from '../pages/modal-inscription/modal-inscription';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PageConnexion,
    ModalInscription
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PageConnexion,
    ModalInscription
  ],
  providers: []
})
export class AppModule {}
