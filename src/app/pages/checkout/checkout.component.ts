import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { JunoCardService } from 'src/app/services/juno-card.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ShopService } from 'src/app/services/shop.service';
import { takeUntil } from 'rxjs/operators';
import { Item } from 'src/app/models/Item';
import { Observable } from 'rxjs';

@Component({

  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkout: any;
  modalRef: BsModalRef;
  items: any =  [{ "product": "Fralda RN 10", "description": "para sujar", "valor": 10.2 }, { "product": "Fralda 2", "description": "para sujar tb", "valor": 20.1 }];
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
