import { Injectable } from '@angular/core';
//import Juno from 'juno-payments';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JunoService {

  /*junosvc = new Juno({
    clientId: environment.JUNO_CLIENT_ID,
    clientSecret: environment.JUNO_SECRET,
    mode: environment.JUNO_ENV,
    token: environment.JUNO_TOKEN
  })*/

  constructor() { }

  /*getSaldo () {
    try {
      const result = this.junosvc.gestao.saldo.consultarSaldo()
      return result
    } catch (error) {
        throw new Error(error)
    }
  }*/

}

