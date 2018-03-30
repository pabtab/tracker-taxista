import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireObject } from 'angularfire2/database/interfaces';

import { UsuarioService} from '../usuario/usuario';

/*
  Generated class for the UbicacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UbicacionProvider {
  usuario: AngularFireObject<any>; 

  constructor(private geolocation: Geolocation,
          private af: AngularFireDatabase,
          private us: UsuarioService) {
    
    this.usuario = this.af.object(`/usuarios/${this.us.clave}`)
  }

  iniciar_localizacion(){
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
     // data can be a set of coordinates, or an error (if an error occurred).
     // data.coords.latitude
     // data.coords.longitude 
     this.usuario.update({lat: data.coords.latitude, lgt: data.coords.longitude})
    });
  }

}
