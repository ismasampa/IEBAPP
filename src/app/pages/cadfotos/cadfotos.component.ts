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

  cadfotoForm: FormGroup;
  constructor(private fb:FormBuilder, private cadfotosService:CadfotosService) { 
    this.cadfotoForm = this.fb.group({
      'Description': ['', [Validators.required]],
      'ImageUrl': ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }
  
  registrar() {     
    this.cadfotosService.create(this.cadfotoForm.value).subscribe(data=>{
      console.log(data);
    });

  }

  get Description(){
    return this.cadfotoForm.get("Description");
  }
  
  get ImageUrl(){
    return this.cadfotoForm.get("ImageUrl");
  }

}