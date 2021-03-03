import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  videosource:string = "/assets/img/semana.mp4";

  constructor() { }

  ngOnInit(): void {
  }

  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }
  playPause() {
    if (this.videoplayer.nativeElement.paused) this.videoplayer.nativeElement.play();
    else this.videoplayer.nativeElement.pause();
  }

  makeBig() {
    this.videoplayer.nativeElement.width = 560;
  }

  makeSmall() {
    this.videoplayer.nativeElement.width = 320;
  }

  makeNormal() {
    this.videoplayer.nativeElement.width = 420;
  }

  restart() {
    this.videoplayer.nativeElement.currentTime = 0;
  }


}
