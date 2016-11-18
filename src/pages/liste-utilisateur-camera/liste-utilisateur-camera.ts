import { Component } from '@angular/core';
import { NavController, NavParams , ModalController , AlertController } from 'ionic-angular';
import { ModalDeconnexion } from '../modal-deconnexion/modal-deconnexion';
import { PageConnexion } from '../connexion/connexion';
import { SMS } from 'ionic-native';

/*
Generated class for the ListeUtilisateurCamera page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
  selector: 'page-liste-utilisateur-camera',
  templateUrl: 'liste-utilisateur-camera.html'
})

export class ListeUtilisateurCamera {

  idCamera : any;
  Utilisateurs: any;
  InformationCamera : any;

  constructor(public navCtrl: NavController , public nav : NavParams , public modalCtrl : ModalController , public alertCtrl : AlertController) {

    this.isConnected();

  }

  ionViewDidLoad() {
    console.log('Hello ListeUtilisateurCamera Page');
  }

  logOut(){
    let confirm = this.modalCtrl.create(ModalDeconnexion);

    confirm.onDidDismiss(data => {

      this.isConnected();

    });

    confirm.present();

  }

  supprimer(utilisateur)
  {
    let index = this.Utilisateurs.indexOf(utilisateur);
    this.Utilisateurs.splice(index,1);
  }

  ajouterUtilisateur(camera)
  {
    var utilisateur;
    var profil;
    var phone;

    let prompt = this.alertCtrl.create({
      title: 'Ajout d\'un utilisateur',
      inputs: [
        {
          name: 'NomUtilisateur',
          placeholder: 'Nom de l\'utilisateur'
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

            //Mock data en absence de liste des utilisateurs
            utilisateur = data.NomUtilisateur;
            profil = 'Utilisateur';
            phone = '0783987897';
            this.Utilisateurs.push({
              username: utilisateur,
              profil: profil,
              image: 'assets/img/batman.png',
              phone : phone
            });

            var options={
              replaceLineBreaks: false, // true to replace \n by a new line, false by default
              android: {
                intent: ''  // Opens Default sms app
                //intent: '' // Sends sms without opening default sms app
              }
            }
            SMS.send(phone, 'Bonjour '+utilisateur+' ! Un droit vous à été accordé sur la '+camera+'. A bientôt sur notre application :)' ,options)
            .then(()=>{
              alert("Message envoyé");
            },()=>{
              alert("Message non envoyé");
            });
          }
        }
      ]
    });
    prompt.present();

  }

  isConnected(){
    if(window.localStorage.getItem("Token")== null)
    {
      let modal = this.modalCtrl.create(PageConnexion);
      modal.present();
    }
    else
    {
      this.idCamera = this.nav.get('camera');

      this.Utilisateurs = [
        {username : 'SylvainGarnot' , profil : 'Admin' , mail : 'Sylvain.garnot@ynov.com' , image : 'assets/img/sylvain.jpg' , phone : '0783987897' },
        {username : 'IMikit' , profil : 'Admin' , mail : 'Mickael@ynov.com' , image : 'assets/img/mickael.png' , phone : '0783987897' },
        {username : 'Mystogan33' , profil : 'Admin' , mail : 'Valentin.gay@ynov.com' , image : 'assets/img/batman.png', phone : '0783987897' },
        {username : 'LoicProust' , profil : 'Admin' , mail : 'Loic.proust@ynov.com' , image : 'assets/img/loic.jpg', phone : '0783987897' }
      ];

      this.InformationCamera =  [
        {title: 'Nom de la caméra' , content : this.idCamera.title , icon: "information-circle" },
        {title: 'Localisation' , content : 'Salle G6' , icon: "locate" },
      ];

    }

  }

}
