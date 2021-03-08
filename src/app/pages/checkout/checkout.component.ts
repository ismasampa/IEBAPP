import { Component, OnInit } from '@angular/core';
import { JunoService } from 'src/app/services/juno.service';
@Component({

  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkout: any;
  constructor(private junoservice: JunoService ) { 
  }

  ngOnInit(): void {
    };

    recebeHash() {     
      window.generateHash(); 
  };


}
