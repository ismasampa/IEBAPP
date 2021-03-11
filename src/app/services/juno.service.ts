import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

class iCardData {
  holderName: string;
  cardNumber: string;
  securityCode: string;
  expirationMonth: string;
  expirationYear: string;
}
export class JunoService {

    constructor( ) {
    }

  getCardHash(){
    const card = {
    cardNumber : "5579006606178504",
    expirationMonth : "12",
    expirationYear : "29",
    holderName : "SEI LA",
    securityCode : "123"};
    //this.juno = new JunoCardHash('970969AAD6BB843AE46EFEAC3022022BC7C8856109F8CD7E8796C2969FEE423D','sandbox');
    //this.juno.getCardHash(card).then(data=> console.log(data));
    return;
  }
  

}

