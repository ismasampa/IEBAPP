import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { JunoCardService } from 'src/app/services/juno-card.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ShopService } from 'src/app/services/shop.service';
import { Item } from 'src/app/models/Item';
import { ChargeContainer, PayFullContainer } from 'src/app/models/Charge';
import { ClipboardService } from 'ngx-clipboard';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({

  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkout: any;
  processing: boolean;
  modalRef: BsModalRef;
  items: any =  [
    { "product": "Pix", "img" : "assets/img/pixqr.png", "tp":"x", "description": "Scaneie o QRCode", "value": 0, "qtd": 0 }, 
    { "product": "Transferência", "img" : "assets/img/itaulogo.png", "tp":"t", "description": "Conta Corrente", "value": 0, "qtd": 0 },     
    { "product": "Sabonete", "img" : "assets/img/sabonete.png", "tp":"p", "description": "3un", "value": 10, "qtd": 0 }, 
    { "product": "Lenços", "img" : "assets/img/lenco.png", "tp":"p", "description": "10un", "value": 20, "qtd": 0 }, 
    { "product": "Shampoo", "img" : "assets/img/shampoo.png", "tp":"p", "description": "300ml", "value": 30, "qtd": 0 }, 
    { "product": "Fralda P", "img" : "assets/img/fralda.png", "tp":"p", "description": "P30", "value": 40, "qtd": 0 }, 
    { "product": "Fralda M", "img" : "assets/img/fralda.png", "tp":"p", "description": "M30", "value": 50, "qtd": 0 }, 
    { "product": "Fralda G", "img" : "assets/img/fralda.png", "tp":"p", "description": "G30", "value": 60, "qtd": 0 }, 
    ];
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
    mesvencto: '',
    anovencto: '',
    cvc: '',
    endereco: '',
    num: '',
    complement: '',
    cep:'',
    cidade: '',
    uf: 'SP'});
  cardError: any;
  itemTotal: number;

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
    console.log("ini");
    this.cart.forEach( x=>{
      let y = this.items.filter(z=>z.product==x.product)[0];
      if( y ){ y.qtd = x.qtd}
      else{
        this.shopService.removeItem(x);
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

  getItemTotal(){
    let total: number;
    this.itemTotal = 0;
    this.cart.forEach(x=>{
      this.itemTotal = this.itemTotal + (x.qtd>0?(x.value * x.qtd):0);});
    return this.itemTotal;
  };

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
  
  removeItem(item){
    Swal.fire({
      title: 'Retirar item',
      icon: 'warning',
      text: 'Comfirma retirada do item?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Sim`,
      cancelButtonText: `Não`
    }).then((result) => {
   if(result.isConfirmed){
        let del = this.items.filter(x => x.product == item.product)[0];
      if(del.qtd){
        del.qtd = 0;
      }
      this.shopService.removeItem(del);
      } 
   });    
  }

  cleanCart(){
    this.items.map(x=> x.qtd=0);
    this.shopService.cleanCart();
    this.checkoutForm.reset();
}

  preparaCartao() {
    if(this.processing){return}
    this.processing = true;

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

  finalizar(fechar){
    this.cobraCartao()
  }

  cobraCartao() {
    
    if(this.processing){return}
    this.processing = true;

    let valor = this.cart.reduce((acc, x) => {
      return acc += x.value * x.qtd;
    }, 0);
    let num = this.checkoutForm.get("num")?.value;
    if(!num){
      num = "N/A";
    }
    let uf:string = this.checkoutForm.get("uf").value;
    uf = uf.toUpperCase();
    let cep:string = this.checkoutForm.get("cep").value;
    cep = cep.replace(/\D+/g,'');

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
                        number : num,
                        complement : this.checkoutForm.get("complement").value,
                        city : this.checkoutForm.get("cidade").value,
                        state : uf,
                        postCode : cep},
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
      this.processing = false;
      Swal.fire({
        title: 'Verifique os dados',
        icon: 'warning',
        text: this.cardError,
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: `Ok`
      }).then((result) => {
        this.desceStep();
      });
    }else{
      if(msg?.payments?.length>0){
        this.cleanCart();
        this.modalRef.hide();
        Swal.fire({
          title: 'Pagamento efetuado',
          text: 'Muito obrigado.',
          icon: 'success',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: `Ok`
        })    ;    
      }else{
        this.cardError = msg.status + ' ' + msg.error;
        Swal.fire({
          title: 'Falha no pagamento',
          icon: 'error',
          text: this.cardError,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: `Ok`
        }).then((result) => {
          this.desceStep();
        });}
        this.processing = false;
    }
  }

  nokCobraCartao(msg){
      console.log(msg);
      this.cardError = msg;
      this.processing = false;
      Swal.fire({
        title: 'Verifique os dados',
        icon: 'warning',
        text: this.cardError,
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: `Ok`
      }).then((result) => {
        this.desceStep();
      });
  }

  okPrepCartao(msg){
    this.cardHash = msg;
    this.sobeStep();
    this.processing = false;
  }

  nokPrepCartao(msg){
    Swal.fire({
        title: 'Falha na geração de hash',
        icon: 'warning',
        text: msg,
        titleText: 'Verifique os dados do cartão',
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: `Ok`
      });
      this.processing = false;
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

  showCartao(){
    Swal.fire({
      html: '<div class="text-light"><div class="row w-100 h-100 mt-0"><div class="col-3 m-0 pt-2"><img src="/assets/img/itaulogo.png" width=100% class="img-rounded ml-2" /></div><div class="col-8 ml-2 mt-2 mb-2 text-left small"><span class="h5 mb-2">Ismael Ribeiro dos Santos</span><br>253.540.508-39<br ><i class="fas fa-university mr-3"></i>Banco Itaú<br ><i  class="fas fa-home mr-3"></i>ag: 7068<br ><i  class="fas fa-file-invoice-dollar mr-3"></i>cc: 10376-6</div></div></div>',
      customClass: {
        htmlContainer: 'bg-color-itau',
      } 
      });
  }
}
