import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { JunoCardService } from 'src/app/services/juno-card.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ShopService } from 'src/app/services/shop.service';
import { Item } from 'src/app/models/Item';
import { Billing, Charge, ChargeContainer, PayFullContainer } from 'src/app/models/Charge';
import { ClipboardService } from 'ngx-clipboard';
import { FormBuilder } from '@angular/forms';
import { PaymentContainer } from 'src/app/models/Payment';

@Component({

  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkout: any;
  modalRef: BsModalRef;
  items: any =  [
    { "product": "Sabonete", "img" : "assets/img/sabonete.png", "description": "3un", "value": 10, "qtd": 0 }, 
    { "product": "Lenços", "img" : "assets/img/lenco.png", "description": "10un", "value": 20, "qtd": 0 }, 
    { "product": "Shampoo", "img" : "assets/img/shampoo.png", "description": "300ml", "value": 30, "qtd": 0 }, 
    { "product": "Fralda P", "img" : "assets/img/fralda.png", "description": "P30", "value": 40, "qtd": 0 }, 
    { "product": "Fralda M", "img" : "assets/img/fralda.png", "description": "M30", "value": 50, "qtd": 0 }, 
    { "product": "Fralda G", "img" : "assets/img/fralda.png", "description": "G30", "value": 60, "qtd": 0 }, 
    ];
  tpPagto: any="";
  cart: Item[];
  step: number;
  cardHash: any;
  chargeContainer: ChargeContainer;
  payfullContainer: PayFullContainer;

  @ViewChild('bscheckout') modalPayment: TemplateRef<any>;  

  checkoutForm = this.formBuilder.group({
    nome: '',
    email: '',
    cpf:'',
    cartao: '',
    mesvencto: '03',
    anovencto: '2030',
    cvc: '',
    endereco: '',
    num: '',
    complement: '',
    cep:'',
    cidade: '',
    estado: ''});
  cardError: any;

  constructor(private junoCardService: JunoCardService, 
    private modalService: BsModalService, 
    private shopService: ShopService,
    private clipboardService: ClipboardService,
    private formBuilder: FormBuilder) {
    this.shopService.getcart().subscribe(cart => this.cart = cart);
    this.step = 0;
  }

  ngOnInit(): void {
    this.initCart();    
  }

  initCart() {
    this.cart.forEach( x=>{
      if(!this.items.filter(z=>z.product==x.product)){
        this.shopService.delItem(x);
      }else{
      if(x.qtd){
        this.items.filter(z=>z.product==x.product)[0].qtd = x.qtd;
      }
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

  cleanCart(){
    this.items.map(x=> x.qtd=0);
    this.shopService.cleanCart();
}

  preparaCartao() {
    const cardData = {
      holderName: this.checkoutForm.get("nome").value,
      cardNumber: this.checkoutForm.get("cartao").value,
      securityCode: this.checkoutForm.get("cvc").value,
      expirationMonth: this.checkoutForm.get("mesvencto").value,
      expirationYear: this.checkoutForm.get("anovencto").value,
    };
    this.cardError = "";
    this.junoCardService.cript(cardData, this.okPrepCartao.bind(this), this.nokPrepCartao.bind(this));
  }

  finalizar(tpPagto,fechar){
    if(tpPagto==1){
      this.cobraCartao()
    }else{
      fechar();
    }
  }

  cobraCartao() {
    let valor = this.cart.reduce((acc, x) => {
      return acc += x.value * x.qtd;
    }, 0);
    let num = this.checkoutForm.get("num")?.value ?? "N/A";
    if(!num){
      num = "N/A";
    }

    this.chargeContainer = {
                charge: {
                    description : "Martim - Lista de Presentes",
                    amount : valor,
                    dueDate : null,
                    installments : 1,
                    paymentTypes: ["CREDIT_CARD"]
                },
                billing: {
                    name : this.checkoutForm.get("nome").value,
                    document : this.checkoutForm.get("cpf").value,
                    email : this.checkoutForm.get("email").value,
                    address: {
                        street : this.checkoutForm.get("endereco").value,
                        number : this.checkoutForm.get("num")?.value ?? "N/A",
                        complement : this.checkoutForm.get("complement").value,
                        city : this.checkoutForm.get("cidade").value,
                        state : this.checkoutForm.get("estado").value,
                        postCode : this.checkoutForm.get("cep").value},
                    birthDate : "",
                    phone : "",
                    notify : false
                }
              };
    this.payfullContainer = {
      creditCardHash: this.cardHash,
      charge : this.chargeContainer
    };
    
    this.cardError = "";            
    this.junoCardService.cobra(this.payfullContainer, this.okCobraCartao.bind(this), this.nokCobraCartao.bind(this));
  }

  okCobraCartao(msg){
    console.log(msg);
    if(msg?.status){
      switch(msg.status){
        case 200:{
          this.cleanCart();
          break
        }
        case 400:{
          this.cardError = msg.details.map(x=>x.message);
          break
        }
        case 500:{
          this.cardError = msg.details.map(x=>x.message);
          break
        }
        default:{
          this.cardError = msg.status + ' ' + msg.error;
          ;
          break
        }
      }
    }else{
      if(msg?.payments?.length>0){
        this.cleanCart();
        this.modalRef.hide();        
      }else{this.cardError = msg.status + ' ' + msg.error;}
    }
  }

  nokCobraCartao(msg){
      console.log(msg);
      this.cardError = msg;
  }

  okPrepCartao(msg){
    this.cardHash = msg;
    console.log(this.cardHash);
    this.sobeStep();
  }

  nokPrepCartao(msg){
    console.log(msg);
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
