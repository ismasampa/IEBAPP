import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShopService } from 'src/app/services/shop.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  audio: any;
  toggleNavbar: any;
  cart: any;
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(private authService: AuthService, private router : Router, private shopService : ShopService) { 
  }  

  ngOnInit() {    
    this.audio = null;
    this.shopService.getcart().subscribe(rcart => {this.cart = rcart;});
  }
  
  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }


  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  logIn(){
    if(this.isAuthenticated()){
      this.authService.logoff();
    }
    return this.router.navigate(['login']);
  }

  playAudio(){
    if(this.audio?.paused){
      this.audio.play();
    }else{
    this.audio = new Audio();
    this.audio.src="assets/songs/song.mp3";
    this.audio.load();
    this.audio.play();}
  }
  stopAudio(){
    this.audio.pause();
    this.audio = null;
  }
  
  prepareCart(){
    this.shopService.setopencart(true);
  }

  getroute(){
    return this.router.url;
  }
}
