import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import {Mural } from 'src/app/models/Mural'

@Injectable({
  providedIn: 'root'
})
export class CadMuralService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  async create(data){
  let mural: Mural;
  mural = new Mural();
  const response = await fetch('http://api.ipify.org/?format=json');
  const api = response.json();
  mural.nome = data.Nome;
  mural.nota = data.Nota;
  mural.privado = data.Privado;
  mural.source = api.ip;
  console.log(mural);
  return this.http.post(environment.apiUrl + 'mural/', mural, { headers: {Authorization: `Bearer ${this.authService.getToken()}`} } );
}

read(){
  return this.http.get(environment.apiUrl + 'mural/ByStatus/1/0', { headers: {Authorization: `Bearer ${this.authService.getToken()}`} } );
}

delete(idx){
  return this.http.delete(environment.apiUrl + 'mural/' + idx, { headers: {Authorization: `Bearer ${this.authService.getToken()}`} } );
}
}
