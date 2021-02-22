import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router : Router) { }
  audio;

  ngOnInit(): void {
    this.audio = null
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
  
}
