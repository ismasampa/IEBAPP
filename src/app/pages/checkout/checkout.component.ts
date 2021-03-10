import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JunoCardService } from 'src/app/services/juno-card.service';
import { JunoService } from 'src/app/services/juno.service';

declare var window;
declare var checkout;
@Component({

  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkout: any;
  @ViewChild("cardHash") cardHash: ElementRef;
  @ViewChild("cardHashError") cardHashError: ElementRef;

  constructor(private junoservice: JunoService, private junoCardService: JunoCardService) {

  }

  ngOnInit(): void {
  };

  recebeHash() {

    this.junoCardService.cript();

    // var cardData = {
    //   cardNumber: '5500497511776173',
    //   holderName: 'Nome do Titular do Cartão',
    //   securityCode: '000',
    //   expirationMonth: '12',
    //   expirationYear: '2045'
    // };
    // console.log("comeco generate");

    // window.generateHash(cardData, this.retorno); 
    // console.log("fim generate");

  }

  retorno(hash, erro) {
    this.cardHash = hash;
    this.cardHashError = erro;
  };
}
