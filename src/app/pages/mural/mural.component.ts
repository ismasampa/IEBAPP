import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { read } from 'fs';
import { CadMuralService } from './cad-mural.service';

@Component({
  selector: 'app-mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.css']
})
export class MuralComponent implements OnInit {


  title='Adicionar mensagem ...';
  closeResult: string;
  modalOptions: NgbModalOptions;
  Items:any;
  cadmuralForm: FormGroup;
  
  constructor(private modalService: NgbModal, private fb:FormBuilder, private cadmuralService:CadMuralService) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    };
    this.cadmuralForm = this.fb.group({
      Nome: ['', [Validators.required]],
      Nota: ['', [Validators.required]],
      Privado: [false],
      Source: ['']
    });
    this.cadmuralService.read().subscribe(data=>{     
      this.Items = data;
    });
   }

  ngOnInit(): void {
  }

  
  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
  async registrar() {  
    let novo: any = {Nome: this.cadmuralForm.get("Nome").value, 
    Nota: this.cadmuralForm.get("Nota").value, 
    Privado: this.cadmuralForm.get("Privado").value ? true : false, 
    Source: "source"}
    return (await this.cadmuralService.create(novo)).subscribe(data=>
      {this.cadmuralService.read().subscribe(data=>{     
        this.Items = data;
      })
    });
  }

  excluir(idx) {     
    this.cadmuralService.delete(idx).subscribe(data=>{ 
      this.cadmuralService.read().subscribe(data=>{     
        this.Items = data;
      });
    });

  }


  get Nota(){
    return this.cadmuralForm.get("Nota");
  }
  
  get Nome(){
    return this.cadmuralForm.get("Nome");
  }

  get Privado(){
    return this.cadmuralForm.get("Privado");
  }

  get Source(){
    return this.cadmuralForm.get("Source");
  }

}
