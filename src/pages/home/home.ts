import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { UsuarioService } from '../../providers/usuario/usuario';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usuario: any = {};
  lat: number = 51.678418;
  lng: number = 7.809007;
  constructor(public navCtrl: NavController, private ubicaProvider: UbicacionProvider, private user: UsuarioService) {
    this.ubicaProvider.iniciar_localizacion();
    this.ubicaProvider.usuario
      .valueChanges()
      .subscribe( data => {
        console.log(data)
        this.usuario = data
      })
  }

  salir(){
    this.user.borrar_usuario();
    this.ubicaProvider.detener_watch();
    this.navCtrl.setRoot("LoginPage");
  }

}
