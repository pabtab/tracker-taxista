import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

import { UsuarioService } from '../../providers/usuario/usuario';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild(Slides) slides: Slides;
  clave:string = "pth-1";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private _us: UsuarioService, 
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController) {
  }

  continuar() {
    let loading = this.loadingCtrl.create({
      content: "Espere por favor..."
    })
    this._us.verifica_usuario(this.clave)
    .then( valido => {
      loading.dismiss();

      if(valido){
        //continuar sig pantalla
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);

      } else {
        this.alertCtrl.create({
          title: "Clave no es correcta",
          subTitle: "Por favor verifique su clave",
          buttons: ["Ok!"]
        }).present();
      }
    })
    .catch( error => {
      loading.dismiss();
      console.log("Error en verifica" + JSON.stringify(error))
    });
  }

  ingresar() {
    //ir a home
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ngAfterViewInit(){
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
    this.slides.paginationType = "progress";
  }

}
