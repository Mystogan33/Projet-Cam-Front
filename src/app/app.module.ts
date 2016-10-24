import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { HomePage } from '../pages/home/home';
import { PageConnexion } from '../pages/connexion/connexion';
import { ModalInscription } from '../pages/modal-inscription/modal-inscription';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
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
    Page1,
    Page2,
    HomePage,
    PageConnexion,
    ModalInscription
  ],
  providers: []
})
export class AppModule {}
