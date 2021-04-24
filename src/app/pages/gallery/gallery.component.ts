import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/models/Item';
import { CadfotosService } from '../../services/cadfotos.service';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnInit {
  Items: any = [
    {"id":1,"description":"Papais do Martim","imageUrl":"/assets/album/acarro.jpg","userId":null,"user":null},
    {"id":2,"description":"Numa fria","imageUrl":"assets/album/bgelo.jpg","userId":null,"user":null},
    {"id":3,"description":"22 semanas","imageUrl":"assets/album/cparede.jpg","userId":null,"user":null},
    {"id":4,"description":"A caiçara","imageUrl":"assets/album/dpraia1.jpg","userId":null,"user":null},
    {"id":5,"description":"Nós três ...","imageUrl":"assets/album/epraia2.jpg","userId":null,"user":null},
    {"id":6,"description":"Gratidão ...","imageUrl":"assets/album/fpraia3.jpg","userId":null,"user":null},
    {"id":7,"description":"Mamãe","imageUrl":"assets/album/gpraia4.png","userId":null,"user":null},
    {"id":8,"description":"Pais","imageUrl":"assets/album/hpraia5.png","userId":null,"user":null},  
    {"id":9,"description":" ","imageUrl":"assets/album/cartaz.png","userId":null,"user":null},
    {"id":10,"description":"Barriguinha ...","imageUrl":"assets/album/barriga0.png","userId":null,"user":null},
    {"id":11,"description":"Crescendo ...","imageUrl":"assets/album/barriga1.png","userId":null,"user":null}
  ];
  bCarregado: boolean;

  constructor(config: NgbCarouselConfig, private cadfotosService:CadfotosService ) {
    this.bCarregado = false;
    config.interval = 5000;
    config.wrap = false;
    config.keyboard = true;
    config.pauseOnHover = true;
   }

  ngOnInit(): void {
    this.bCarregado = true;
  }
}
