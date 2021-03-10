import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { JunoCardService } from 'src/app/services/juno-card.service';
import { JunoService } from 'src/app/services/juno.service';


import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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

  modalRef: BsModalRef;

  constructor(private junoservice: JunoService, private junoCardService: JunoCardService, private modalService: BsModalService) {

  }

  ngOnInit(): void {
  };

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

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
