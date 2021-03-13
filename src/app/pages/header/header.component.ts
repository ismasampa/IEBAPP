import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
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
  actualroute: any;

  constructor(private authService: AuthService, private router : Router, private arouter : ActivatedRoute , private shopService : ShopService) { 
        
  }  

  ngOnInit() {    
    this.audio = null;
    this.shopService.getcart().subscribe(rcart => {this.cart = rcart;});
    this.setroute(window.location.hash.substr(1));
  }
  
  ngOnDestroy() {
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

  setroute(parm){
    switch(parm){
      case "/":{
        this.actualroute = "Home"
        break
      }
      case "/home":{
        this.actualroute = "Home"
        break
      }
      case "/gallery":{
        this.actualroute = "Imagens"
        break
      }
      case "/preview":{
        this.actualroute = "Previsão"
        break
      }
      case "/event":{
        this.actualroute = "Chá de Fraldas"
        break
      }
      case "/mural":{
        this.actualroute = "Mural"
        break
      }
      case "/checkout":{
        this.actualroute = "Lista de Presentes"
        break
      }
      default :{
        this.actualroute = "Home"
        break
      }
    }
  }

  getroute(){
    return this.router.url;
  }
}
