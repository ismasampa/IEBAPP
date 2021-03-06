import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CadfotosService } from '../../services/cadfotos.service';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnInit {
  Items;
  bCarregado: boolean;

  constructor(config: NgbCarouselConfig, private cadfotosService:CadfotosService ) {
    this.bCarregado = false;
    config.interval = 100000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
   }

  ngOnInit(): void {
    this.bCarregado = false;
    //this.Items = ["casal.jpeg","home.jpg","home0.png","home1.png","home2.png","home3.png"]
    //  .map((n) => `assets\\album\\${n}`);
    this.cadfotosService.read().subscribe(data=>{this.Items = data;this.bCarregado = true;});
    }

}
