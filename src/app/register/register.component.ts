import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb:FormBuilder, private authService:AuthService) { 
    this.registerForm = this.fb.group({
      'username': ['',Validators.required],
      'email': ['',Validators.required],
      'phone': ['',Validators.required],
      'password': ['',Validators.required]
    })
  }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe(data=>{
      console.log(data)
    })
  }

  get username(){
    return this.registerForm.get('username');
  }
  get password(){
    return this.registerForm.get('password');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get phone(){
    return this.registerForm.get('phone');
  }


}
