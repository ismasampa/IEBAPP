import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginPath = environment.apiUrl + 'identity/login'
  private registerPath = environment.apiUrl + 'identity/register'
  constructor( private http: HttpClient) { }

  login(data): Observable<any> {
    return this.http.post(this.loginPath, data);
  }

  logoff() {
    return localStorage.removeItem('token');
  }

  register(data): Observable<any> {
    return this.http.post(this.registerPath, data, { headers: {'UserAuth': environment.userAuth} } )
  }

  
  saveToken(token) {
    localStorage.setItem('token',token)
  }
  
  removeToken() {
    localStorage.removeItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isAuthenticated() {
    if( this.getToken()){return true;}else{ return false }
  }
}


