import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CadfotosService } from '../../services/cadfotos.service';

@Component({
  selector: 'app-cadfotos',
  templateUrl: './cadfotos.component.html',
  styleUrls: ['./cadfotos.component.css']
})
export class CadfotosComponent implements OnInit {
  Items
  cadfotoForm: FormGroup;
  constructor(private fb:FormBuilder, private cadfotosService:CadfotosService) { 
    this.cadfotoForm = this.fb.group({
      'Description': ['', [Validators.required]],
      'ImageUrl': ['', [Validators.required]]
    });
    this.cadfotosService.read().subscribe(data=>{     
      this.Items = data;
    });
  }

  ngOnInit(): void {
  }
  
  registrar() {     
    this.cadfotosService.create(this.cadfotoForm.value).subscribe(data=>{     
    });

  }

  excluir(idx) {     
    this.cadfotosService.delete(idx).subscribe(data=>{ 
      this.cadfotosService.read().subscribe(data=>{     
        this.Items = data;
      });
    });

  }


  get Description(){
    return this.cadfotoForm.get("Description");
  }
  
  get ImageUrl(){
    return this.cadfotoForm.get("ImageUrl");
  }

}