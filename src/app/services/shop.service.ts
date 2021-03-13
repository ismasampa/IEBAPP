import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../models/Item';
@Injectable({
  providedIn: 'root'
})

export class ShopService {
  private _cart: BehaviorSubject<Array<Item>> = new BehaviorSubject<Array<Item>>([]);
  public cartopen: boolean;

  constructor() {
    let cartcache = localStorage.getItem("cart");
    if(cartcache){
      this._cart.next(JSON.parse(cartcache));
    }
  }
  getcart(): Observable<Array<Item>> {
    return this._cart.asObservable();
  }

  getopencart(){
    let aux = this.cartopen;
    this.cartopen=false;
    return aux;
  };
  
  setopencart(parm){
    this.cartopen=parm;
  };

  addItem(item: Item) {
    let add = this._cart.value.filter(x => x.product == item.product)[0];
    if (!add) {
      this._cart.value.push(item);
    } else {
      add.qtd = item.qtd;
    }
    localStorage.setItem("cart", JSON.stringify(this._cart.value));
    this._cart.next(this._cart.value);
  };

  delItem(item) {
    let del = this._cart.value.filter(x => x.product == item.product)[0];
    if (del) {
      if (item.qtd==0) {
        this._cart.value.splice(this._cart.value.indexOf(del),1);
      }
      else {
        del.qtd = item.qtd;
      }
    }
    this._cart.next(this._cart.value);
    localStorage.setItem("cart", JSON.stringify(this._cart.value));
  }

  removeItem(item) {
    let del = this._cart.value.filter(x => x.product == item.product)[0];
    if (del) {
      this._cart.value.splice(this._cart.value.indexOf(del),1);
    }
    this._cart.next(this._cart.value);
    localStorage.setItem("cart", JSON.stringify(this._cart.value));
  }

  cleanCart(){
    this._cart.next([]);
    localStorage.setItem("cart", JSON.stringify(this._cart.value));
  }
}

