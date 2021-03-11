import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { JunoCardService } from 'src/app/services/juno-card.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ShopService } from 'src/app/services/shop.service';
import { Item } from 'src/app/models/Item';
import { ClipboardService } from 'ngx-clipboard';

@Component({

  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkout: any;
  modalRef: BsModalRef;
  items: any =  [
  { "product": "Fralda RN", "description": "RN 10", "value": 10, "qtd": 0 }, 
  { "product": "Fralda P", "description": "P 10", "value": 20, "qtd": 0 }, 
  { "product": "Fralda M", "description": "M 10", "value": 30, "qtd": 0 }, 
  { "product": "Fralda G", "description": "G 10", "value": 40, "qtd": 0 }, 
  { "product": "Fralda XG", "description": "XG 10", "value": 50, "qtd": 0 }, 
  { "product": "Fralda XXG", "description": "XXG 10", "value": 60, "qtd": 0 }, 
  { "product": "Fralda G30", "description": "G 30", "value": 80, "qtd": 0 }, 
  { "product": "Fralda XG30", "description": "XXG 30", "value": 100, "qtd": 0 }, 
  { "product": "Fralda c/ alarme", "description": "Alerta", "value": 200, "qtd": 0 }, 
  { "product": "Fralda Geriátrica", "description": "Geriat.", "value": 300, "qtd": 0 }
  ];
  tpPagto: any="";
  cart: Item[];
  step: number;
  @ViewChild('bscheckout') modalPayment: TemplateRef<any>;  

  constructor(private junoCardService: JunoCardService, 
    private modalService: BsModalService, 
    private shopService: ShopService,
    private clipboardService: ClipboardService) {
    this.shopService.getcart().subscribe(cart => this.cart = cart);
    this.step = 0;
  }

  ngOnInit(): void {
    this.initCart();    
  }

  initCart() {
    this.cart.forEach( x=>{
      if(x.qtd){
        this.items.filter(z=>z.product==x.product)[0].qtd = x.qtd;
      }
    });
    setTimeout(() => 
    {
      if(this.shopService.getopencart()==true){
        this.openModal(this.modalPayment);
      } 
    },
    1000);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addItem(item){
    let add = this.items.filter(x => x.product == item.product)[0];
    add.qtd++;
    if(!add.qtd){
      add.qtd = 1;}
    this.shopService.addItem(add);
};

  delItem(item){
      let del = this.items.filter(x => x.product == item.product)[0];
      del.qtd--;
      if(!del.qtd){
        del.qtd = 0;
      }
      this.shopService.delItem(del);
  }

  recebeHash() {
    this.junoCardService.cript();
  }

  sobeStep(){
    this.step++;
  }

  desceStep(){
    this.step--;
  }

  copyContent() {
    this.clipboardService.copyFromContent("00020126650014BR.GOV.BCB.PIX0111253540508390228Lista de presentes do Martim52040000530398654040.005802BR5925ISMAEL RIBEIRO DOS SANTOS6009SAO PAULO622605224k8UVH6YIySWErJELgmdHb63043FB6");
  }
}
