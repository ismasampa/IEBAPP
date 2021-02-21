import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iebapp';

  constructor( private authService : AuthService, private router : Router){
    if(!this.isAuthenticated){this.router.navigate(['login']);} 
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
}
