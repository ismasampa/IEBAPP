import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { JunoCardService } from 'src/app/services/juno-card.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ShopService } from 'src/app/services/shop.service';
import { Item } from 'src/app/models/Item';
import { Billing, Charge, ChargeContainer } from 'src/app/models/Charge';
import { ClipboardService } from 'ngx-clipboard';
import { FormBuilder } from '@angular/forms';

@Component({

  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkout: any;
  modalRef: BsModalRef;
  items: any =  [
  { "product": "Shampoo", "description": "Johnson", "value": 10, "qtd": 0 }, 
  { "product": "Lenços", "description": "Johnson", "value": 9, "qtd": 0 }, 
  { "product": "Sabonete", "description": "3 unidades", "value": 8, "qtd": 0 }, 
  { "product": "Fralda P", "description": "P 28", "value": 18.79, "qtd": 0 }, 
  { "product": "Fralda M", "description": "M 24", "value": 20, "qtd": 0 }, 
  { "product": "Fralda G", "description": "G 20", "value": 22, "qtd": 0 }, 
  { "product": "Fralda XG", "description": "XG 30", "value": 50, "qtd": 0 }, 
  { "product": "Fralda XXG", "description": "XXG 30", "value": 60, "qtd": 0 }, 
  { "product": "Fralda XG30", "description": "XXG 30", "value": 100, "qtd": 0 }, 
  { "product": "Fralda c/ alarme", "description": "Alerta", "value": 200, "qtd": 0 }, 
  { "product": "Fralda Geriátrica", "description": "Geriat.", "value": 300, "qtd": 0 }
  ];
  tpPagto: any="";
  cart: Item[];
  step: number;
  cardHash: any;
  chargeContainer: ChargeContainer;

  @ViewChild('bscheckout') modalPayment: TemplateRef<any>;  

  checkoutForm = this.formBuilder.group({
    nome: '',
    cpf:'',
    cartao: '',
    mesvencto: '03',
    anovencto: '2030',
    cvc: '',
    endereco: '',
    cep:'',
    cidade: '',
    estado: '',
    pais: ''
  });

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

  preparaCartao() {
    const cardData = {
      holderName: this.checkoutForm.get("nome").value,
      cardNumber: this.checkoutForm.get("cartao").value,
      securityCode: this.checkoutForm.get("cvc").value,
      expirationMonth: this.checkoutForm.get("mesvencto").value,
      expirationYear: this.checkoutForm.get("anovencto").value,
    };
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
    this.chargeContainer = {
                charge: {
                    description : "Descrição da cobranca",
                    amount : 2.23,
                    installments : 1,
                    paymentTypes: ["CREDIT_CARD"],
                    CreditCardHash: this.cardHash
                },
                billings: {
                    name : this.checkoutForm.get("nome").value,
                    document : this.checkoutForm.get("cpf").value,
                    email : "",
                    address: {
                        street : this.checkoutForm.get("endereco").value,
                        number : "",
                        complement : "",
                        city : this.checkoutForm.get("cidade").value,
                        state : this.checkoutForm.get("estado").value,
                        postCode : this.checkoutForm.get("cep").value},
                    birthDate : "",
                    phone : "",
                    notify : false
                }
              };

    this.junoCardService.cobra(this.chargeContainer, this.okCobraCartao.bind(this), this.nokCobraCartao.bind(this));
  }

  okCobraCartao(msg){
    console.log(msg);
  }

  nokCobraCartao(msg){
    console.log(msg);
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
