import { Component } from '@angular/core';
import { NavController, NavParams , ModalController , AlertController } from 'ionic-angular';
import { ModalDeconnexion } from '../modal-deconnexion/modal-deconnexion';
import { PageConnexion } from '../connexion/connexion';
import { SMS } from 'ionic-native';
import { ServProvider } from '../../providers/serv-provider';

@Component({
  selector: 'page-liste-utilisateur-camera',
  templateUrl: 'liste-utilisateur-camera.html',
  providers: [ServProvider]
})

export class ListeUtilisateurCamera {

  idCamera : any;
  Utilisateurs: any;
  InformationCamera : any;
  reponse : any;

  constructor(public navCtrl: NavController , public nav : NavParams , public modalCtrl : ModalController , public alertCtrl : AlertController , public serv : ServProvider) {

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


            SMS.send(phone, 'Bonjour '+utilisateur+' ! Un droit vous à été accordé sur la caméra '+this.idCamera.camera+'. A bientôt sur notre application :)' ,options)
            .then(()=>{
              alert("Message envoyé");
            },()=>{
              alert("Message non envoyé");
            });

            var bodyRequest = JSON.stringify({identifier : localStorage.getItem('username')});

            this.serv.addRightUser(bodyRequest , this.idCamera.camera,2).subscribe(

              data => {
                console.log(data);
              },
              err => {

                alert(err);

              },
              () => console.log("")
            );
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
        {title: 'Nom de la caméra' , content : 'Caméra '+this.idCamera.camera , icon: "information-circle" },
        {title: 'Localisation' , content : 'Salle G6' , icon: "locate" },
      ];

    }

  }

}
