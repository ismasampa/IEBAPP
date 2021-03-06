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
  routerLocal:any;
  constructor( private authService : AuthService, private router : Router){
    this.routerLocal = router;
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
}
