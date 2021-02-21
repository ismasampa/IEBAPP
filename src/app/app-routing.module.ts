import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadfotosComponent } from './pages/cadfotos/cadfotos.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent , canActivate: [AuthGuardService]},
  { path: 'register', component: RegisterComponent , canActivate: [AuthGuardService]},
  { path: 'cad', component: CadfotosComponent , canActivate: [AuthGuardService]},
  { path: 'gallery', component: GalleryComponent , canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
