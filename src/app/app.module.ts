import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
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
    MuralComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    AuthService, AuthGuardService, 
    LoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi:true},
    CadfotosService,
    CadMuralService,    
    ItemsService,
    JunoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
