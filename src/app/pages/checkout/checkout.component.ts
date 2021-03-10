import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { JunoCardService } from 'src/app/services/juno-card.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ShopService } from 'src/app/services/shop.service';
import { takeUntil } from 'rxjs/operators';
import { Item } from 'src/app/models/Item';
import { Observable } from 'rxjs';
import { isIndexSignatureDeclaration } from 'typescript';

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
  unsubscribe$: Observable<any>;
  cart: Item[];
  step:number;

  constructor(private junoCardService: JunoCardService, 
    private modalService: BsModalService, 
    private shopService: ShopService) {
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
}
