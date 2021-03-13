import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JunoService } from './services/juno.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CadfotosComponent } from './pages/cadfotos/cadfotos.component';
import { CadfotosService } from './services/cadfotos.service';
import { LoaderComponent } from './common/loader/loader.component';
import { LoaderService } from './common/loader/loader.service';
import { LoaderInterceptorService } from './common/loader/loader-interceptor.service.spec';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PreviewComponent } from './pages/preview/preview.component';
import { ItemsComponent } from './pages/items/items/items.component';
import { ItemsService } from './services/items.service';
import { EventComponent } from './pages/event/event.component';
import { MuralComponent } from './pages/mural/mural.component';
import { CadMuralService } from './pages/mural/cad-mural.service';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ShopService } from './services/shop.service';
import { ClipboardModule } from 'ngx-clipboard';
import { AvatarModule, AvatarSource } from 'ngx-avatar';
import { DatePipe } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const avatarSourcesOrder = [AvatarSource.CUSTOM, AvatarSource.INITIALS];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CadfotosComponent,
    LoaderComponent,
    HomeComponent,
    HeaderComponent,
    GalleryComponent,
    PreviewComponent,
    ItemsComponent,
    EventComponent,
    MuralComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ModalModule.forRoot(),
    ClipboardModule,
    AvatarModule.forRoot({
      sourcePriorityOrder: avatarSourcesOrder
    }),
    [SweetAlert2Module.forRoot()],
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi:true},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthService, AuthGuardService, 
    LoaderService,
    CadfotosService,
    CadMuralService,    
    ItemsService,
    JunoService,
    ShopService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
