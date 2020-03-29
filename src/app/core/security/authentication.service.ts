import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './credenciais.dto';
import { AppKeys } from '../keys/app-keys';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  autenticarLogin(credenciais: CredenciaisDTO) {
    return this.http.post(AppKeys.apiUrl + 'login', credenciais, {observe: 'response', responseType: 'text'});
  }
}
