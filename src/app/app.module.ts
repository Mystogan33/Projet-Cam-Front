import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PageConnexion } from '../pages/connexion/connexion';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PageConnexion,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PageConnexion,
  ],
  providers: []
})
export class AppModule {}
