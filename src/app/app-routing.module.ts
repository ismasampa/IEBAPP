import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadfotosComponent } from './pages/cadfotos/cadfotos.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { ItemsComponent } from './pages/items/items/items.component';
import { LoginComponent } from './pages/login/login.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent,},
  { path: 'gallerycad', component: CadfotosComponent , canActivate: [AuthGuardService]},
  { path: 'gallery', component: GalleryComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'preview', component: PreviewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
