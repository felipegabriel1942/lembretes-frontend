import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/shared/models/usuario';
import { AppKeys } from 'src/app/core/keys/app-keys';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  buscarUsuarioPorEmailESenha(email: string, senha: string) {
    return this.http.get(AppKeys.apiUrl + `usuario/buscar-usuario-email-e-senha?email=${email}&senha=${senha}`);
  }
}
