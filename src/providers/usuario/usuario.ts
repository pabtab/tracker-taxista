
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UsuarioService {
  clave: string = "";

  constructor(private af: AngularFireDatabase) {
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
          resolve(true)
        }
      })
    })
    .catch(error => 
      console.log("error en promesa service")
    );

    return promesa;
  }

}
