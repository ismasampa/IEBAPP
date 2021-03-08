import { Component, Inject, OnInit } from '@angular/core';
import { JunoService } from 'src/app/services/juno.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkout: any;
  constructor(private junoservice: JunoService ) { 
    //this.checkout = DirectCheckout('970969AAD6BB843AE46EFEAC3022022BC7C8856109F8CD7E8796C2969FEE423D', false);
  }

  ngOnInit(): void {
  }

  recebeHash(){
    this.junoservice.getCardHash()
  }


}
