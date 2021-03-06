import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { map, filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadfotosService {

  constructor(private http: HttpClient, private authService: AuthService) {
    }
  create(data){
    return this.http.post(environment.apiUrl + 'foto/', data, { headers: {Authorization: `Bearer ${this.authService.getToken()}`} } );
  }

  read(){
    return this.http.get(environment.apiUrl + 'foto/', { headers: {Authorization: `Bearer ${this.authService.getToken()}`} } );
  }

  delete(idx){
    return this.http.delete(environment.apiUrl + 'foto/' + idx, { headers: {Authorization: `Bearer ${this.authService.getToken()}`} } );
  }


}
