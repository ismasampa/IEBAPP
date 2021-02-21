import { Component, OnInit } from '@angular/core';
import { CadfotosService } from '../../services/cadfotos.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(private cadfotosService:CadfotosService, config: NgbCarouselConfig) {
    config.interval = 4000;  
    config.wrap = true;  
    config.keyboard = false;  
    config.pauseOnHover = true;
    this.Items = null;
    this.bCarregado = false;
   }
  Items;
  bCarregado: boolean;

  ngOnInit(): void {

    this.bCarregado = false;
    this.getSample().then(data => {
      this.Items = data;
      this.bCarregado = true;
    })
    //this.cadfotosService.read().subscribe(data=>{this.Items = data;});
  }

  getSample = async ()=> {return Promise.all( [944,1011,984].map((n) => `https://picsum.photos/id/${n}/900/500`)) 
  }

}
