
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular'

@Injectable()
export class UsuarioService {
  clave: string = null;

  constructor(private af: AngularFireDatabase,
    private storage: Storage,
    private platform: Platform) {
  }

  verifica_usuario(clave:string){
    clave = clave.toLocaleLowerCase();

    let promesa = new Promise( (resolve, reject) => {
      this.af.list(`/usuarios/${clave}`)
      .valueChanges()
      .subscribe( data => {

        if(!data.length){
          //clave no correcta
          resolve(false)
        } else {
          this.clave = clave;
          this.guardar_storage();
          resolve(true)
        }
      })
    })
    .catch(error => 
      console.log("error en promesa service")
    );

    return promesa;
  }

  guardar_storage() {
    let promesa = new Promise ( (resolve, reject ) => {
      if(this.platform.is("cordova" )){
        //movil
        this.storage.set('clave', this.clave);        
      } else {
        //pc
        if(this.clave){
          localStorage.setItem("clave", this.clave)
        } else {
          localStorage.removeItem("clave")
        }
      }
    })
    
    return promesa;
  }

  cargar_storage(){
    let promesa = new Promise( (resolve, reject) => {
      if(this.platform.is("cordova")){
         this.storage.ready()
          .then( () => {
            this.storage.get("clave").then(clave => {
              this.clave = clave;
              resolve();
            })
          })
      } else {
        this.clave = localStorage.getItem("clave");
        resolve();
      }
    })
    return promesa;
  }

}
